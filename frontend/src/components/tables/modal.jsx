import React, {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const Window = (props) => {

  let show = props.show;
  let id = props.date.id_Jogo ? props.date.id_Jogo : 'fodase'
  const[golTimeA, setGolTimeA] = useState(0)
  const[golTimeB, setGolTimeB] = useState(0)

  return (
    <Modal show={show} onHide={show}>
      <Modal.Header closeButton>
        <Modal.Title>Editar a partida {id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Gols time A" onChange={(e)=>{setGolTimeA(e.target.value)}}/> <br />
        <Form.Control type="text" placeholder="Gols Time B" onChange={(e)=>{setGolTimeB(e.target.value)}}/> <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Fechar
          </Button>
        <Button variant="primary" onClick={()=>{alteraJogo(id, golTimeA, golTimeB)}}>
          Salvar alterações
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

function alteraJogo(id_Jogo, gols_TimeA, gols_TimeB){
    let url =  `http://localhost:3001/editar/${id_Jogo}/${gols_TimeA}/${gols_TimeB}`
    axios.get(url).then(res=>{
      alert(res.statusText)
    })
}

export default Window;