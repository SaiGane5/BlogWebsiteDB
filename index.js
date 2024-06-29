import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import 'dotenv/config';

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
