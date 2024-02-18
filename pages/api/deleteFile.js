import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method.toLowerCase() === 'delete') {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
          return;
        }

        const image = fields.image;

        if (!image) {
          res.status(400).json({ error: 'Nieprawidłowe żądanie - brak nazwy pliku' });
          return;
        }

        const filePath = path.join(process.cwd(), 'public', image);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Wewnętrzny błąd serwera podczas usuwania pliku' });
            return;
          }

          res.status(200).json({ success: true, message: 'Plik usunięty pomyślnie' });
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
