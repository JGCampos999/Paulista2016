import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class GrupoSeparado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TimeA: [],
            TimeB: [],
            TimeC: [],
            TimeD: []
        }
        this.getTimaA();
        this.getTimeB();
        this.getTimeC();
        this.getTimeD();
    }

    getTimaA() {
        let url = "http://localhost:3001/TimeA"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeA: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeB() {
        let url = "http://localhost:3001/TimeB"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeB: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeC() {
        let url = "http://localhost:3001/TimeC"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeC: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeD() {
        let url = "http://localhost:3001/TimeD"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeD: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    rootStyle = {
        width: '400px',
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    render() {
        return (
            <div>
                <Paper style={this.rootStyle}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Grupo</TableCell>
                                <TableCell align="left">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeA.map(row => (
                                <TableRow key={row.id_Grupo}>
                                    <TableCell align="right">{row.id_Grupo}</TableCell>
                                    <TableCell align="left">{row.nome_Time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={this.rootStyle}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Grupo</TableCell>
                                <TableCell align="left">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeB.map(row => (
                                <TableRow key={row.id_Grupo}>
                                    <TableCell align="right">{row.id_Grupo}</TableCell>
                                    <TableCell align="left">{row.nome_Time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <Paper style={this.rootStyle}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Grupo</TableCell>
                                <TableCell align="left">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeC.map(row => (
                                <TableRow key={row.id_Grupo}>
                                    <TableCell align="right">{row.id_Grupo}</TableCell>
                                    <TableCell align="left">{row.nome_Time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={this.rootStyle}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Grupo</TableCell>
                                <TableCell align="left">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeD.map(row => (
                                <TableRow key={row.id_Grupo}>
                                    <TableCell align="right">{row.id_Grupo}</TableCell>
                                    <TableCell align="left">{row.nome_Time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}