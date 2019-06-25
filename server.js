const express = require('express'),
cors= require('cors'),
bp = require ('body-parser'),
DB_NAME = "petshelter_db",
app = express(),
port = 8000;

app.use(cors());
app.use(bp.json());

app.use(express.static(__dirname +"/client/build"));

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.all('*',(req, res, next) => {
    res.sendFile(__dirname + "./client/build/index.html")
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});