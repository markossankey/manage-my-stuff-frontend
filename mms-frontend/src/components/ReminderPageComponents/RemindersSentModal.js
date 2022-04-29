// react-bootstrap components
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RemindersSentModal(props) {
  const { showModal, successfullReminders } = props


  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Successfully sent to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successfullReminders ? [...successfullReminders].map((name, index) => <p key={name + index}>{name}</p>) : <p>No one</p>}
        </Modal.Body>
        <Modal.Footer>
          <Link to='/' >
            <Button variant="success">
              Back to home
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default RemindersSentModal