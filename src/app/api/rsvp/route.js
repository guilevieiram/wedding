import { readConvidados } from '@/lib/convidados';
import { writeJson, listJsonFiles } from '@/lib/local';
function sanitizeName(str = '') {
    return str
      .normalize('NFD')                     // 1) Transform to Unicode 'NFD' form
      .replace(/[\u0300-\u036f]/g, '')      // 2) Strip diacritic marks (accents)
      .toLowerCase()                        // 3) Convert to lowercase
      .replace(/\s+/g, '');                 // 4) Remove all whitespace
  }
export async function POST(req) {
    try {
        const data = await req.json();

        // check against database
        if (data.firstName === '')
            return new Response(
                JSON.stringify({ message: 'Favor fornecer primeiro  nome válido.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        if (data.lastName === '')
            return new Response(
                JSON.stringify({ message: 'Favor fornecer último nome válido.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        if (data.hotel=== '')
            return new Response(
                JSON.stringify({ message: 'Favor fornecer o hotel de hospedagem.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );

        const convidados = readConvidados();
        const foundPerson = convidados.find(
            row => (
                sanitizeName(row.Nome) === sanitizeName(data.firstName)
                && sanitizeName(row.Sobrenome) === sanitizeName(data.lastName)
                 
            )
        )

        if (!foundPerson)
            return new Response(
                JSON.stringify({ message: 'Nâo achamos seu nome na lista. Confira o nome como indicado no convite.',}),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );


        if (parseInt(data.convidados, 10) > parseInt(foundPerson.Acompanhantes, 10))
            return new Response(
                JSON.stringify({ message: `Você pode chamar mais ${foundPerson.Convidados} pessoas.`,
                    }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );

        if (parseInt(data.kids, 10) > parseInt(foundPerson.Criancas, 10))
            return new Response(
                JSON.stringify({ message: `Você pode trazer mais ${foundPerson.Criancas} crianças.`,
                   }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );


        const id = `${foundPerson.Nome}-${foundPerson.Sobrenome}`

        const files = listJsonFiles('rsvp');
        if (files.includes(id))
            return new Response(
                JSON.stringify({ message: `Você ja confirmou sua presença.`,
                    }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );

        // Write to local disk
        const writeResult = writeJson(id, 'rsvp', data);
        if (!writeResult.success) {
            throw new Error(writeResult.error || 'Unknown write error');
        }

        return new Response(
            JSON.stringify({ message: `Successfully confirmed person.` }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error in POST /rsvp:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to write JSON', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

