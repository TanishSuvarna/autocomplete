import fs from 'fs';
import * as csv from 'csv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.resolve(__dirname, '../../archive', 'blogtext.csv');
export const getData =  async (rowLimit) => {
   return new Promise((res , rej) => {
        let strings = [];
        let readStream = fs.createReadStream(filePath);
        let parser = csv.parse({ columns: true });

        parser.on('readable', function () {
        let record;
            while ((record = parser.read())) {
                record.id = strings.length;
                strings.push(record);
                

                if (parseInt(strings.length) >= parseInt(rowLimit)) {
                    parser.destroy();
                    res(strings);
                    return;
                }
            }
        });

        parser.on('error', function (err) {
            console.log(err.message);
            rej(err);
        });


        readStream.pipe(parser);
   })
}
