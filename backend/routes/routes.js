const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
const AllowCors = require('./cors');
const port = 3001;

var config = {
    user: 'Filipe',
    password: 'sou123eu',
    server: 'localhost',
    database: 'Testes'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(AllowCors);

app.listen(port, () => {
    sql.connect(config).then(() => {
        console.log("se pa foi")
    }).catch((err) => {
        console.log(err)
    });
    request = new sql.Request();
});

app.get('/times', (req, res) => {
    request.query("SELECT * FROM Times", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
}
)

app.get('/editar/:id_Jogo/:gols_time_a/:gols_time_b', (req, res) => {

    let id_Jogo = req.params.id_Jogo
    let gols_time_a = req.params.gols_time_a
    let gols_time_b = req.params.gols_time_b

    console.log(id_Jogo, gols_time_a, gols_time_b)

    request.query(`EXEC sp_mudaFinal ${id_Jogo}, ${gols_time_a}, ${gols_time_b} `, (err, recordset) => {
        if (err) {
            res.status(500).send({ err })
        }
        res.send("ok")
    })
})

app.get('/filtro/:data', (req, res) => {
    let data = req.params.data
    request.query(`select * from jogos where data = '${data}'`, (err, recordset) => {
        if (err) {
            res.status(500).send({ err })
        }
        res.json(recordset)
    })
})

app.get('/rebaixados', (req, res) => {
    request.query('SELECT * FROM v_tRebaixados', (err, recordset) => {
        if (err) {
            res.send(err)
        }
        res.json(recordset)
    })
})

app.get('/grupos', (req, res) => {
    request.query("exec sp_divGrp", (err, recordset) => {
        if (err) {
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

app.get('/gerarSorteio', (req, res) => {
    request.query("delete  from jogos", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        request.query("exec sp_geraJogos", (err, recordset) => {
            if (err) {
                console.log(err)
            }
            request.query("select * from v_Jogos", (err, recordset) => {
                if (err) {
                    console.log(err)
                }
                res.send(recordset)
            })
        })
    })
})

app.get('/TimeA', (req, res) => {
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'a'", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})

app.get('/TimeB', (req, res) => {
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'b'", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})

app.get('/TimeC', (req, res) => {
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'c'", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})
app.get('/TimeD', (req, res) => {
    request.query("select g.id_Grupo, t.nome_Time from grupos g \n inner join times t \n on g.cod_Time = t.codigo_Time \n where id_grupo = 'd'", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})
