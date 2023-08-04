import { db } from '../src/config/db.config';
import swaggerDocs from './application/util/swagger';
import dotenv from 'dotenv';
import createServer from '../src/application/util/server';
const cors = require('cors');

dotenv.config();

const port = process.env.APP_PORT

const app = createServer();


db.then(() => {
    app.listen(process.env.APP_PORT, () => console.log(`Server is listening on port ${port}`));
    swaggerDocs(app, 7070)
});