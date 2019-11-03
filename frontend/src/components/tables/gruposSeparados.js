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
        this.getTimeA();
        this.getTimeB();
        this.getTimeC();
        this.getTimeD();
    }

    getTimeA() {
        let url = "http://localhost:3001/Time/A"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeA: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeB() {
        let url = "http://localhost:3001/Time/B"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeB: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeC() {
        let url = "http://localhost:3001/Time/C"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeC: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    getTimeD() {
        let url = "http://localhost:3001/Time/D"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio = data.recordset
            this.setState({ TimeD: sorteio })
        }).catch(err => {
            console.log(err)
        })
    }

    rootStyle = {
        width: '1000px',
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    render() {
        return (
            <div>
                <Paper style={this.rootStyle}>
                    Grupo A <br />
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Time</TableCell>
                                <TableCell align="left">Jogos Disputados</TableCell>
                                <TableCell align="left">Vitorias</TableCell>
                                <TableCell align="left">Empates</TableCell>
                                <TableCell align="left">Derrotas</TableCell>
                                <TableCell align="left">Gols Marcados</TableCell>
                                <TableCell align="left">Gols Sofridos</TableCell>
                                <TableCell align="left">Saldo de Gols</TableCell>
                                <TableCell align="left">Pontos</TableCell>
                                <TableCell align="left">Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeA.map(row => (
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
                                    <TableCell align="left">{row.Situacao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={this.rootStyle}>
                    Grupo B <br />
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Time</TableCell>
                                <TableCell align="left">Jogos Disputados</TableCell>
                                <TableCell align="left">Vitorias</TableCell>
                                <TableCell align="left">Empates</TableCell>
                                <TableCell align="left">Derrotas</TableCell>
                                <TableCell align="left">Gols Marcados</TableCell>
                                <TableCell align="left">Gols Sofridos</TableCell>
                                <TableCell align="left">Saldo de Gols</TableCell>
                                <TableCell align="left">Pontos</TableCell>
                                <TableCell align="left">Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeB.map(row => (
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
                                    <TableCell align="left">{row.Situacao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={this.rootStyle}>
                    Grupo C <br />
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Time</TableCell>
                                <TableCell align="left">Jogos Disputados</TableCell>
                                <TableCell align="left">Vitorias</TableCell>
                                <TableCell align="left">Empates</TableCell>
                                <TableCell align="left">Derrotas</TableCell>
                                <TableCell align="left">Gols Marcados</TableCell>
                                <TableCell align="left">Gols Sofridos</TableCell>
                                <TableCell align="left">Saldo de Gols</TableCell>
                                <TableCell align="left">Pontos</TableCell>
                                <TableCell align="left">Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeC.map(row => (
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
                                    <TableCell align="left">{row.Situacao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={this.rootStyle}>
                    Grupo D <br />
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Time</TableCell>
                                <TableCell align="left">Jogos Disputados</TableCell>
                                <TableCell align="left">Vitorias</TableCell>
                                <TableCell align="left">Empates</TableCell>
                                <TableCell align="left">Derrotas</TableCell>
                                <TableCell align="left">Gols Marcados</TableCell>
                                <TableCell align="left">Gols Sofridos</TableCell>
                                <TableCell align="left">Saldo de Gols</TableCell>
                                <TableCell align="left">Pontos</TableCell>
                                <TableCell align="left">Situação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.TimeD.map(row =>(
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
                                    <TableCell align="left">{row.Situacao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}