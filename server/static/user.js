import fs from 'fs';
import * as csv from 'csv';

export const getData =  async (rowLimit) => {
   return new Promise((res , rej) => {
        let strings = [];
        let readStream = fs.createReadStream('../../archive/blogtext.csv');
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
