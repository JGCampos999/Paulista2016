import React from 'react';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Rebaixados extends React.Component {

    constructor(props) {
        super(props)
        this.getRebaixados();
        this.state = {
            rows: []
        }
    }

    getRebaixados() {
        let url = "http://localhost:3001/rebaixados"

        Axios.get(url).then(res => {
            const data = res.data
            const recordset = data.recordsets
            this.setState({
                rows: recordset
            })
        })
    }

    rootStyle = {
        width: '900px',
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    asideStyle = {
        width: '130px'
    }


    render() {
        return (
            <div>
                <Paper style={this.rootStyle}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Jogos Disputados</TableCell>
                                <TableCell align="left">Vitorias</TableCell>
                                <TableCell align="left">Empates</TableCell>
                                <TableCell align="left">Derrotas</TableCell>
                                <TableCell align="left">Gols Marcados</TableCell>
                                <TableCell align="left">Gols Sofridos</TableCell>
                                <TableCell align="left">Saldo de Gols</TableCell>
                                <TableCell align="left">Pontos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow key={row.Time}>
                                    <TableCell align="right">{row.Jogos_Disputados}</TableCell>
                                    <TableCell align="right">{row.Vitorias}</TableCell>
                                    <TableCell align="left">{row.Empates}</TableCell>
                                    <TableCell align="left">{row.Gols_Marcados}</TableCell>
                                    <TableCell align="left">{row.Gols_Sofridos}</TableCell>
                                    <TableCell align="left">{row.Saldo_de_Gols}</TableCell>
                                    <TableCell align="left">{row.Pontos}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Rebaixados;