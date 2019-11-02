import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Sorteio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }

    getSorteio() {
        let url = "http://localhost:3001/gerarSorteio"
        axios.get(url).then(res => {
            let data = res.data
            const sorteio =  data.recordset
            this.setState({
                rows: sorteio
            })
        }).catch(err => {
            console.log(err)
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
                <aside className="ml-5 float-left text-center" style={this.asideStyle}>
                    <button type="button" class="btn btn-primary" onClick={() => { this.getSorteio() }}>Sortear</button>
                    <br />
                    <br />
                    O sorteio é realizado de forma aleatória
                    <br />
                </aside>
                <aside >
                    <Paper style={this.rootStyle}>
                        <Table  >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Time A</TableCell>
                                    <TableCell align="left">Time B</TableCell>
                                    <TableCell align="left">Gols Time A</TableCell>
                                    <TableCell align="left">Gols Time B</TableCell>
                                    <TableCell align="left">Data do Jogo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow key={row.id_Grupo}>
                                        <TableCell align="right">{row.Time_A}</TableCell>
                                        <TableCell align="left">{row.Time_B}</TableCell>
                                        <TableCell align="left">{row.Gols_Time_A}</TableCell>
                                        <TableCell align="left">{row.Gols_Time_B}</TableCell>
                                        <TableCell align="left">{row.Data.replace("T00:00:00.000Z", "")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </aside>
            </div>
        )
    }
}