// react hooks
import { useState, useEffect } from 'react'

// router hooks
import { useParams } from 'react-router-dom'

//bootstrap components
import { Card, Form, Button, FormControl, InputGroup } from 'react-bootstrap'

// API functions
import { getCustomer, updateCustomer } from '../../API/apiCallers';

import { motion } from 'framer-motion'
import SuccessfulUpdateModal from '../../components/CustomerPagesComponents/SuccessfulUpdateModal';


function CustomerPage(props) {

  let { customerID } = useParams()

  const [customer, setCustomer] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getCustomer(customerID).then((response) => {
      setCustomer(response)
    })
  }, [])

  const handleUpdateCustomer = async (evt) => {
    let form = evt.target
    let updatedCustomerInfo = {
      'id': customerID,
      'first_name': form[0].value,
      'last_name': form[1].value,
      'phone_number': form[2].value
    }
    let updatedCustomerResponse = await updateCustomer(customerID, updatedCustomerInfo)
    console.log('updatedCustomerResp', updatedCustomerResponse)
    setUpdatedCustomer(updatedCustomerResponse)
    setShowModal(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'unset' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
      className="d-flex justify-content-center"
    >
      <SuccessfulUpdateModal showModal={showModal} updatedCustomer={updatedCustomer} />
      <Card className="bg-transparent my-2" style={{ width: '60%' }}>
        <Card.Body>
          <Card.Title className='text-center'>Edit Customer</Card.Title>
          <Form onSubmit={handleUpdateCustomer} className="d-flex flex-column align-items-center">
            <Card.Text>
            </Card.Text>
            <InputGroup className="mb-3" style={{ width: '70%' }}>
              <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
              <FormControl
                defaultValue={customer ? customer.first_name : ''}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3" style={{ width: '70%' }}>
              <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
              <FormControl
                defaultValue={customer ? customer.last_name : ''}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3" style={{ width: '70%' }}>
              <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
              <FormControl
                defaultValue={customer ? customer.phone_number : ''}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <div className='d-flex justify-content-center'>
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default CustomerPage


