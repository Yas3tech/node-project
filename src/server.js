import 'dotenv/config';
import app from './app.js';
import { initDB } from './config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server: http://localhost:${PORT}`);
    });
};

startServer();
