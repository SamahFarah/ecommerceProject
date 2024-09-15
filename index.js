import express from 'express'
import initApp from './src/initApp.js';
import 'dotenv/config';


const app = express()
initApp(app,express);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`project app listening on port ${port}!`))