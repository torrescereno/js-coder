const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Hola Mundo")
})


app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}/`);
})

