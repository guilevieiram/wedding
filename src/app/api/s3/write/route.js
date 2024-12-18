import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from 'dotenv';
// dotenv.config();

const s3Client = new S3Client({ 
  region: 'sa-east-1',
});

export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Method not allowed. Use POST.' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { key, data } = await req.json();
    console.log('got it', key, data);

    const params = {
      Bucket: 'buegui',
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
      ACL: 'public-read'
    };

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    console.log('got result', result);
    
    return new Response(
      JSON.stringify({ message: 'Successfully wrote JSON to S3', result }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to write JSON to S3', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
