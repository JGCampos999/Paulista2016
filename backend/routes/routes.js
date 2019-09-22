var express = require('express')
var app = express()
var sql = require('mssql')

var config = {
    user: 'Filipe',
    password: 'sou123eu',
    server: 'localhost',
    database: 'Testes'
};

app.use("/", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.get('/times', (req, res) => {
    request.query("SELECT * FROM Times", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
}
)

app.get('/grupos', (req, res) => {
    request.query("SELECT * FROM grupos", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
}
)

app.listen(3001, () => {
    sql.connect(config).then(() => {
        console.log("se pa foi")
    }).catch((err) => {
        console.log(err)
    });
    request = new sql.Request();
})