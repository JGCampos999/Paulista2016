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

app.post('/sorteio:data', (req, res)=>{
    let data = req.params.data
    request.query(`select *, convert(char(10),data,103) as dataFormatada from jogos where data = (cast('${data}' as date))`, (err, recordset)=>{
        if(err){
            console.log(err)
        }
        res.send(recordset)
    })
})

app.get('/grupos', (req, res) => {
    request.query("exec sp_divGrp", (err, recordset1)=>{
        if(err){
            console.log(err)
        }
        request.query("select \ng.id_Grupo, \nt.nome_Time \nfrom grupos as g \ninner join times as t \non g.cod_Time = t.codigo_Time", (err, recordset) => {
            if (err) {
                console.log(err)
            }
            res.json(recordset)
        })
    })
}
)

app.get('/gerarSorteio', (req, res)=>{
    request.query("delete  from jogos", (err, recordset)=>{
        if(err){
            console.log(err)
        }
        request.query("exec sp_geraJogos",(err, recordset)=>{
            if(err){
                console.log(err)
            }
            request.query("select * from v_Jogos", (err, recordset)=>{
                if(err){
                    console.log(err)
                }
                res.send(recordset)
            })
        })
    })
})

app.get('/TimeA', (req, res)=>{
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'a'", (err, recordset)=>{
        if(err){
            console.log(err)
        }
        res.json(recordset)
    })
})

app.get('/TimeB', (req, res)=>{
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'b'", (err, recordset)=>{
        if(err){
            console.log(err)
        }
        res.json(recordset)
    })
})

app.get('/TimeC', (req, res)=>{
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'c'", (err, recordset)=>{
        if(err){
            console.log(err)
        }
        res.json(recordset)
    })
})
app.get('/TimeD', (req, res)=>{
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'd'", (err, recordset)=>{
        if(err){
            console.log(err)
        }
        res.json(recordset)
    })
})
app.listen(3001, () => {
    sql.connect(config).then(() => {
        console.log("se pa foi")
    }).catch((err) => {
        console.log(err)
    });
    request = new sql.Request();
})