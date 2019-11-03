import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class SimpleTable extends React.Component {
    constructor(props) {
        super(props)
        this.getTimes()
        this.state = { rows: [] }
        
    }

    rootStyle = {
        width: '1100px',
        marginTop:'20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    getTimes() {
        let url = "http://localhost:3001/times"
        axios.get(url).then(res => {
            let data = res.data
            const times = data.recordset
            this.setState({ rows: times })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Paper style={this.rootStyle}>
                <Table  >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="left">Jogos Disputados</TableCell>
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
                                <TableCell align="right">{row.Time}</TableCell>
                                <TableCell align="left">{row.Jogos_Disputados}</TableCell>
                                <TableCell align="left">{row.Vitorias}</TableCell>
                                <TableCell align="left">{row.Empates}</TableCell>
                                <TableCell align="left">{row.Derrotas}</TableCell>
                                <TableCell align="left">{row.Gols_Marcados}</TableCell>
                                <TableCell align="left">{row.Gols_Sofridos}</TableCell>
                                <TableCell align="left">{row.Saldo_de_Gols}</TableCell>
                                <TableCell align="left">{row.Pontos}</TableCell>  
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}