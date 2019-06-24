const express = require("express"),
cors= require('cors'),
bp = require ('body-parser'),
DB_NAME = "petshelter_db",
app = express(),
port = 8000;

app.use(cors());
app.use(bp.json());

//app.express.static

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});