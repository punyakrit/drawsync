import express from 'express';
import globalRouter from './routes/global';

const app = express()

app.use('/api/v1', globalRouter)

app.listen(8000)