import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

const Window = (props) => {

   

    let show = props.show;
    let id = props.date.id_Jogo ? props.date.id_Jogo : 'fodase'

    return (
        <Modal show={show} onHide={show}>
        <Modal.Header closeButton>
          <Modal.Title>{props.date.data}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ props.close }>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Window;