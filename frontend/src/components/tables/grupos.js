import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Grupos extends React.Component{
    constructor(props){
        super(props)
        this.getGrupos()    
        this.state={rows: []}
    }

    rootStyle = {
        width: '800px',
        marginTop:'20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    getGrupos(){
        let url = "http://localhost:3001/grupos"
        axios.get(url).then(res=>{
            let data = res.data
            let grupos = data.recordset
            this.setState({rows: grupos})
        })
    }
    render(){
        return(
            <Paper style={this.rootStyle}>
                <Table  >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">grupo</TableCell>
                            <TableCell align="left">codigo_Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.id_Grupo}>
                                <TableCell align="right">{row.id_Grupo}</TableCell>
                                <TableCell align="left">{row.cod_Time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}