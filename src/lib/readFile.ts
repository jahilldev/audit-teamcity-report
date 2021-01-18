import fs from 'fs';

/* -----------------------------------
 *
 * Read
 *
 * -------------------------------- */

const readFile = (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(data);
    });
  });

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { readFile };
