import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { supabase } from '../../../../services/supabaseClient'; // Adjust the path as necessary
import extract from 'pdf-extraction';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

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
      // Use pdf-extraction for PDF parsing
      const data = await extract(Buffer.from(fileBuffer));
      resumeText = data.text;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Generate a unique interview_id
    const interview_id = uuidv4();

    // Save the resumeText and generated interview_id to Supabase
    const { data, error } = await supabase
      .from('resumes')
      .insert([{ resumeText: resumeText, interview_id: interview_id }]) // Include interview_id
      .select(); // Select the inserted data

    if (error) {
      console.error('Error saving resume to Supabase:', error);
      return NextResponse.json({ error: 'Failed to save resume data' }, { status: 500 });
    }

    // Construct the interview link using the generated interview_id
    const interviewLink = `/interview/${interview_id}/start`; // Assuming your interview start page is at /interview/[id]/start

    console.log('Resume saved and link generated:', interviewLink);

    return NextResponse.json({ message: 'File uploaded, parsed, saved, and link generated successfully', fileName: file.name, interviewLink });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}