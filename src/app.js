import express from 'express';
import { requestLogger } from './middleware/logger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generateDocsHTML } from './views/docs.js';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/', (req, res) => {
    res.type('html').send(generateDocsHTML());
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
