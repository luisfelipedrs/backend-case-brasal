import express from 'express';
import { db } from '../src/config/db.config';
import { router } from './task.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tasks', router);

db.then(() => {
    app.listen(8080, () => console.log('Server is listening on port 8080'));
});