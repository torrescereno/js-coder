import express from 'express';
import { Server } from './server'

const app = express();
const server = new Server(8080, app)

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
  
// Raiz
app.get('/', (req, res) => {
    res.end('Hola Mundo!')
})

// Render index
app.get('/index',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

// Router
app.use('/api', require('./routes/router'));

// Listener
server.listen();