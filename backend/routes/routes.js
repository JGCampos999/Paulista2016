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
    request.query("select * from v_Champ", (err, recordset) => {
        if (err) {
            console.log(err) 
        }
        res.json(recordset)
    })
}
)

app.get('/final', (req, res) => {
    request.query("select * from fn_4_Final()", (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})

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
    request.query(`SELECT id_Jogo, timeA, timeB, golsA, golsB, CONVERT(VARCHAR, data, 103) AS 'data'
    FROM fn_mostraJogos() where data = '${data}'`, (err, recordset) => {
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
            request.query("SELECT timeA AS 'Time_A', timeB AS 'Time_B', golsA AS 'Gols_Time_A', golsB AS 'Gols_Time_B', CONVERT(VARCHAR, data, 103) AS 'Data' FROM fn_mostraJogos()", (err, recordset) => {
                if (err) {
                    console.log(err)
                }
                res.send(recordset)
            })
        })
    })
}) 

app.get('/Time/:grupo', (req, res) => {
    let grupo = req.params.grupo
    request.query(`SELECT nomeTime AS 'Time', jogosD AS 'Jogos_Disputados', vitorias AS 'Vitorias', 
    empates AS 'Empates', derrotas AS 'Derrotas', golsM AS 'Gols_Marcados',
    golsS AS 'Gols_Sofridos', saldoG AS 'Saldo_de_Gols', pontos AS 'Pontos',
    CASE WHEN (idT in (SELECT TOP 4 idT FROM fn_Champ() ORDER BY pontos ASC, vitorias ASC, golsM ASC, saldoG ASC)) THEN
        'Rebaixado'
    ELSE
        'Disputante'
    END AS Situacao
    FROM fn_Group('${grupo}')
    ORDER BY pontos DESC, vitorias DESC, golsM DESC, saldoG DESC`, (err, recordset) => {
        if (err) {
            console.log(err)
        }
        res.json(recordset)
    })
})