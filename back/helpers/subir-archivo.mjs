import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const subirArchivo = (archivo, idUsuario = null) => {
    return new Promise((resolve, reject) => {
        const extensionesValidas = ['jpg','jpeg', 'png', 'gif', 'webp'];
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];

        if(!extensionesValidas.includes(extension)) return reject({error: `${extension} no valido`});

        const nombreAleatorio = `${uuidv4()}.${extension}`;
        // sino hay idUsuario, los archivos no se guardaran en una carpeta individual por usuario
        const uploadPath = idUsuario ?  `${__dirname}/../uploads/${idUsuario}/${nombreAleatorio}` :  `${__dirname}/../uploads/${nombreAleatorio}`;
    
        archivo.mv(uploadPath, (error) => {
            if(error) return reject(error);
            resolve(nombreAleatorio);
        })

    })
}