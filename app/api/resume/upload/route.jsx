import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { supabase } from '../../../../services/supabaseClient';
import extract from 'pdf-extraction';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileType = file.type;
    let resumeText = '';

    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ arrayBuffer: fileBuffer });
      resumeText = result.value;
    } else if (fileType === 'application/pdf') {
      const data = await extract(Buffer.from(fileBuffer));
      resumeText = data.text;
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' }, { status: 400 });
    }
    
    // Ensure text was actually extracted
    if (!resumeText || resumeText.trim().length === 0) {
        return NextResponse.json({ error: 'Could not extract any text from the resume file.' }, { status: 500 });
    }

    // Generate a single unique ID for both records
    const interview_id = uuidv4();

    // Step 1: Save the parsed resume text to the 'resumes' table
    // IMPORTANT: Make sure 'resumes' is the exact table name in your Supabase project (check for case-sensitivity)
    const { error: resumeError } = await supabase
      .from('resumes')
      .insert([{ resumeText: resumeText, interview_id: interview_id }]);

    if (resumeError) {
      console.error('Error saving resume to Supabase:', resumeError);
      return NextResponse.json({ error: 'Failed to save resume data' }, { status: 500 });
    }

    // Step 2: Create the corresponding record in the 'Interviews' table
    // IMPORTANT: This is the critical step that was missing.
    // Make sure 'Interviews' is the exact table name.
    const { error: interviewError } = await supabase
      .from('Interviews')
      .insert([{
        interview_id: interview_id,
        type: 'resume-based',         // Set the type for the interview page
        jobPosition: 'Resume Review',    // Provide a default job position
        duration: '5',                  // Provide a default duration in minutes
        // Add any other required fields from your 'Interviews' table here, like a user ID
      }]);

    if (interviewError) {
      console.error('Error creating interview record in Supabase:', interviewError);
      // Optional: If this fails, you might want to delete the resume entry to prevent orphaned data
      return NextResponse.json({ error: 'Failed to create interview session' }, { status: 500 });
    }

    // Construct the interview link using the generated ID
    const interviewLink = `/interview/${interview_id}/start`;

    return NextResponse.json({
      message: 'File uploaded and interview created successfully.',
      fileName: file.name,
      interviewLink
    });
    
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}