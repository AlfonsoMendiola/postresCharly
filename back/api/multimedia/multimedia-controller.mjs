import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const multimediaController = {
    // para consultar un archivo por url
    getArchivo: async(req, res) => {
        try {
            //si se manda un header con el id del usuario, al archivo se buscara en su carpeta individual
            const rutaArchivo = req.headers['usuario_id'] ? `../../uploads/${req.headers['usuario_id']}/${req.params.nombre}` : `../../uploads/${req.params.nombre}`;
            const filePath = path.join(__dirname, rutaArchivo);
            await fs.access(filePath);
            res.sendFile(filePath);
        } catch (error) {
            const noImageFilePath = path.join(__dirname, '../../assets/no-image.jpg');
            if (error.code == 'ENOENT') return res.sendFile(noImageFilePath);
            return res.status(400).json({error});
        }
    }
}