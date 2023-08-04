import express from 'express';
import { db } from '../src/config/db.config';
import { router } from './routes';
import { errorHandler } from './application/middleware/error-handler';
const cors = require('cors');


const app = express();

const corsOptions = {
    origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);
app.use(errorHandler);

db.then(() => {
    app.listen(process.env.APP_PORT, () => console.log('Server is listening on port ' + process.env.APP_PORT));
});