import express from 'express'
import initApp from './src/initApp.js';
import 'dotenv/config';


const app = express()
initApp(app,express);


app.listen(process.env.PORT, () => console.log(`project app listening on port ${process.env.PORT}!`))