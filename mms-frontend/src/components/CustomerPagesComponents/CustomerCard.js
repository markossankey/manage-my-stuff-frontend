// bootstrap components
import { useEffect } from 'react'
import { Card, Button, Container } from 'react-bootstrap'

// router components
import { Link } from 'react-router-dom'
import { deleteCustomer } from '../../API/apiCallers'

import { motion } from 'framer-motion'

function CustomerCard(props) {

  const { customer, dirty, setDirty } = props

  const handleDelete = async () => {
    let response = await deleteCustomer(customer.id)
    setDirty(!dirty)
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, width: '100' }}
      transition={{ duration: '.3' }}
      className='d-flex justify-content-center'
    >
      <Card key={customer.id} className="mt-2" style={{ width: '20rem' }}>
        <Card.Body className="text-center">
          <Card.Title>{customer.first_name} {customer.last_name}</Card.Title>
          <Card.Text>
            {customer.phone_number}
          </Card.Text>
          <Container className='d-flex justify-content-around g-1'>
            <Link to={'' + customer.id} >
              <Button variant="outline-warning">Update</Button>
            </Link>
            <Button variant="primary" onClick={handleDelete}>Delete</Button>
          </Container>
        </Card.Body>
      </Card>
    </motion.div >
  )
}

export default CustomerCard