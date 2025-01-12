import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readConvidados() {
    const filePath = path.join(process.cwd(), 'public', 'convidados.csv');

    // 2. Read file contents
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 3. Parse the CSV into an array of objects
    //    'columns: true' -> uses the first row as object keys
    //    'skip_empty_lines: true' -> ignores empty lines
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    return records;
}
