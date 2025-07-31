import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import extract from 'pdf-extraction';

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

    return NextResponse.json({ resumeText });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
