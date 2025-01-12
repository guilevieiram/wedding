import { writeJson, readJson } from '@/lib/local';

/**
 * POST: Write JSON data to local ~/.data folder.
 * 
 * Expected request body format:
 * {
 *   "key": "<unique identifier for the file>",
 *   "data": { ...any JSON data... }
 * }
 */
export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Method not allowed. Use POST.' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { key, data } = await req.json();

    if (!key || !data) {
      return new Response(
        JSON.stringify({ message: 'Missing key or data in request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Write to local disk
    const writeResult = writeJson(key, data);
    if (!writeResult.success) {
      throw new Error(writeResult.error || 'Unknown write error');
    }

    return new Response(
      JSON.stringify({ message: `Successfully wrote JSON to ~/.data/${key}.json` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in POST /local-json:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to write JSON', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * GET: Read JSON data from local ~/.data folder.
 *
 * Example usage: GET /api/local-json?key=<unique-key>
 */
export async function GET(req) {
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ message: 'Method not allowed. Use GET.' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Extract the 'key' query param from the request URL
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      return new Response(
        JSON.stringify({ message: 'Missing "key" query parameter.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Read data from local disk
    const data = readJson(key);

    if (data === null) {
      return new Response(
        JSON.stringify({ message: `No data found for key: ${key}` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in GET /local-json:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to read JSON', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
