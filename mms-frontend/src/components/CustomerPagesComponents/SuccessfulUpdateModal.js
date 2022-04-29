import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SuccessfulUpdateModal(props) {

  const { showModal, updatedCustomer } = props

  console.log(updatedCustomer)

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Successfully Updated to</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updatedCustomer
            && <>
              <p>{updatedCustomer['first_name'] + ' ' + updatedCustomer['last_name']}</p>
              <p>{updatedCustomer['phone_number']} </p>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Link to='/customers' >
            <Button variant="success">
              Back to customers
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SuccessfulUpdateModal