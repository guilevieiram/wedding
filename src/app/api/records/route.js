import { readAllJson} from '@/lib/local';
export async function GET(req) {
    try {
      // Extract the requested directory (if provided)
      const url = new URL(req.url);
      const subdir = url.searchParams.get('subdir') || '.data';
  
      // Read every JSON file in the directory
      const records = readAllJson(subdir);
  
      if (!records.length) {
        return new Response(
          JSON.stringify({ message: 'Nenhum registro encontrado.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(records), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error in GET /records:', error);
      return new Response(
        JSON.stringify({ message: 'Falha ao ler registros.', error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
