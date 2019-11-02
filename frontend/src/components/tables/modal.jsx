import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const Window = (props) => {

    const useStyles = makeStyles(theme => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles()

    return (
        <div>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={props.open}
                className={classes.paper}
            >
                <div>
                    <h2 id="simple-modal-title">Editar as configurações do jogo.</h2>
                    <p id="simple-modal-description">

                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default Window;