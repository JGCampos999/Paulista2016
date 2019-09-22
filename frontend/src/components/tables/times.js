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
        console.log(this.state.rows)
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
            <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Codigo</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Cidade</TableCell>
                            <TableCell align="left">Estadio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow onClick={()=>console.log(row)} key={row.codigo_Time}>
                                <TableCell align="right">{row.codigo_Time}</TableCell>
                                <TableCell align="left">{row.nome_Time}</TableCell>
                                <TableCell align="left">{row.cidade}</TableCell>
                                <TableCell align="left">{row.estadio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}