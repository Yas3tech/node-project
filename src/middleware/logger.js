import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = ':date[iso] :method :url :status :response-time ms';

const logToFile = (message) => {
    const logPath = path.join(logsDir, 'access.log');
    fs.appendFile(logPath, message + '\n', (err) => {
        if (err) console.error('Log error:', err);
    });
};

export const requestLogger = morgan(logFormat, {
    stream: {
        write: (message) => {
            console.log(message.trim());
            logToFile(message.trim());
        }
    }
});
