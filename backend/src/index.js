import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.route.js";
import todoRoutes from './routes/todo.route.js'
import path from 'path'
const app = express();
dotenv.config();
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname,'../frontend', 'dist', 'index.html'))
    })
}


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});