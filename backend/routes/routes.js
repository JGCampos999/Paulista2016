var express = require('express')
var app = express()
var sql = require('mssql')
var request = ''

var config = {
    user: 'Filipe',
    password: 'sou123eu',
    server: 'localhost',
    database: 'Testes'
};

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
    sql.connect(config).then(()=>{
        console.log("se pa foi")
    }).catch((err)=>{
        console.log(err)
    });
    request = new sql.Request();
})