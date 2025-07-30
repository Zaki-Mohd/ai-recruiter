import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { supabase } from '../../../../services/supabaseClient'; // Adjust the path as necessary
import extract from 'pdf-extraction'; // Changed import

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
      const data = await extract(Buffer.from(fileBuffer)); // Changed usage
      resumeText = data.text;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Save the resumeText to Supabase
    const { data, error } = await supabase
      .from('resumes')
      .insert([{ resumeText: resumeText }])
      .select(); // Select the inserted data to get the ID

    if (error) {
      console.error('Error saving resume to Supabase:', error);
      return NextResponse.json({ error: 'Failed to save resume data' }, { status: 500 });
    }

    const resumeId = data[0]?.id; // Get the ID of the inserted record

    if (!resumeId) {
        console.error('Error retrieving resume ID from Supabase data:', data);
        return NextResponse.json({ error: 'Failed to retrieve resume ID' }, { status: 500 });
    }

    // Construct the interview link (adjust the base URL as needed)
    const interviewLink = `/interview/${resumeId}/start`; // Assuming your interview start page is at /interview/[id]/start

    console.log('Resume saved and link generated:', interviewLink);

    return NextResponse.json({ message: 'File uploaded, parsed, saved, and link generated successfully', fileName: file.name, interviewLink });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}