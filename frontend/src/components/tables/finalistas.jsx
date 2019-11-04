import React from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Finalistas extends React.Component {
    constructor(props) {
        super(props)
        this.getTimes()
        this.state = { rows: [] }
        
    }

    rootStyle = {
        width: '500px',
        marginTop:'20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    }

    getTimes() {
        let url = "http://localhost:3001/final"
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
                            <TableCell align="right">Cod Time</TableCell>
                            <TableCell align="left">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.codTime}>
                                <TableCell align="right">{row.codTime}</TableCell>
                                <TableCell align="left">{row.nomeTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}