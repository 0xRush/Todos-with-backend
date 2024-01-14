import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import TodoRouter from './routes/TodoRoutes.js';


const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('app is working')
})

app.use('/todos', TodoRouter)



mongoose.connect(mongoDBURL)
.then(() => {
    console.log('app is connected to the DB');

    app.listen(PORT, () => {
        console.log(`app is listenning at port ${PORT}`);
    });
})
.catch (err => {
    console.log(err)
});
