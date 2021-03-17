const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const handlebars = require('express-handlebars');
const formatMessage = require('./public/js/message.js');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./public/js/user');

const dbSqlite = require('./DB/DB_SQLite3')


const config = {
    extname: '.hbs',
    defaultLayout: '',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
};

const botName = 'Chat live';

app.engine('hbs', handlebars(config));
app.set('view engine', 'hbs');
app.set('views', './BE/17/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {})
})

app.get('/chat', (req, res) => {
    res.render('chat', {})
})

io.on('connection', function (socket) {

    const userId = socket.id;

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('messages', formatMessage(userId, botName, 'Bienvenid@'));

        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(userId, botName, `${user.username} ingresó al grupo`)
            );

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(userId);

        // Insert mensaje en SQLite (persistencia de mensajes)
        dbSqlite.insertMensje(user.username, msg)

        io.to(user.room).emit('message', formatMessage(userId, user.username, msg));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(userId, botName, `${user.username} se fue del grupo`)
            );

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

});

server.listen(PORT, function () {
    console.log(`http://localhost:${PORT}/`);
})


