import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import NoData from '../NoData/NoData'

export default function AlertDelete({functionDelete,world}) {
  return <>
  <Modal.Body className='text-center'>

<NoData world={world}/>
</Modal.Body>
<Modal.Footer>
  <Button className='btn-delete ' onClick={() => {
    functionDelete()
  }}>
    Delete this item
  </Button>
</Modal.Footer>
  
  </>
}
