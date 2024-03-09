import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function AlertAddAndDeleteRecipes({AnyFunction , title}) {
  return <>
  
  <Modal.Body className='text-center'>
    <h3>{title}</h3>
</Modal.Body>
<Modal.Footer>
  <Button className='btn mx-auto ' onClick={() => {
    AnyFunction()
  }}>
   Sure
  </Button>
</Modal.Footer>
  
  </>
}
