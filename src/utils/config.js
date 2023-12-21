import { dirname } from "path";
import { fileURLToPath } from "url";
// Multer
import multer from "multer";

export const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de Multer
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
