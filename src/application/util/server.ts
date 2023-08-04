import express from 'express';
import { router } from '../../routes';
import { errorHandler } from '../middleware/error-handler';
const cors = require('cors');

function createServer() {
    const app = express();

    const corsOptions = {
    origin: ["http://localhost:8080"],
    };

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1', router);
    app.use(errorHandler);

    return app;
}

export default createServer;