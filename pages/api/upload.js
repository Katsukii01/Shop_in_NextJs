import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method.toLowerCase() === 'post') {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
          return;
        }

        const file = files.image;
        const fileName = file.name; 
        const newPath = path.join(process.cwd(), 'public/images', fileName);

        fs.rename(file.path, newPath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
            return;
          }

          const filePath = `/images/${fileName}`;
          res.status(200).json({ filePath });
        });
      });

      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
    }
  }

  res.status(405).json({ error: 'Metoda niedozwolona' });
}
