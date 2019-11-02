import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from './modal'

class Filtro extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            data: 0, 
            open: false
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    getByDate(data) {
        let url = `http://localhost:3001/filtro/${data}`
        
            axios.get(url).then(res => {
            const data = res.data
            let recordset = data.recordsets[0]
            this.setState({ 
                rows: recordset
            })
            console.log(this.state.rows)
        }).catch( err => {
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
                    <input type="date" onChange={(e) => { this.setState({ data: e.target.value }) }} />
                    <br />
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => { this.getByDate(this.state.data) }}>selecionar por data</button>
                </aside>
                <aside >
                `    <Paper style={this.rootStyle}>
                        <Table  >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">ID do Jogo</TableCell>
                                    <TableCell align="right">Codigo Time A</TableCell>
                                    <TableCell align="left">Codigo Time B</TableCell>
                                    <TableCell align="left">Gols Time A</TableCell>
                                    <TableCell align="left">Gols Time B</TableCell>
                                    <TableCell align="left">Data do Jogo</TableCell>
                                    <TableCell align="left"> Opções </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow key={row.id_Jogo}>
                                        <TableCell align="right">{row.id_Jogo}</TableCell>
                                        <TableCell align="right">{row.cod_TimeA}</TableCell>
                                        <TableCell align="left">{row.cod_TimeB}</TableCell>
                                        <TableCell align="left">{row.gols_TimeA}</TableCell>
                                        <TableCell align="left">{row.gols_TimeB}</TableCell>
                                        <TableCell align="left">{row.data.replace("T00:00:00.000Z", "")}</TableCell>
                                        <TableCell align="left"><button type="button" className="btn btn-sm btn-primary"
                                        onClick={()=>{this.handleOpen()} } onClose={()=>{this.handleClose()}}>Editar</button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>`
                </aside>
                <Modal status={this.state.open}/>
            </div>           
        )
    }
}

export default Filtro;