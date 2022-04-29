// react hooks
import { useState } from 'react'

// react boostrop
import { Card, Button, InputGroup, FormControl, Form } from 'react-bootstrap'

// api functions 
import { addCustomer } from '../../API/apiCallers'


function AddCustomerForm(props) {

  const { setCustomers, customers } = props
  const [dirty, setDirty] = useState(false);

  let fields = ['First Name', 'Last Name', 'Phone #']

  const renderInputFields = (fields) => {
    return fields.map((field) => {
      return <FormControl
        className='my-2'
        key={field}
        placeholder={field}
        aria-label={field}
        aria-describedby="basic-addon1"
      />
    })
  }

  const handleAddCustomer = async (evt) => {
    let createCustomerResponseData = await addCustomer(evt)
    setCustomers([...customers, createCustomerResponseData])
    console.log(evt)
  }

  return (
    <Card dirty={dirty} className="bg-transparent my-2">
      <Card.Body>
        <Card.Title className='text-center'>Add a customer</Card.Title>
        <Form onSubmit={handleAddCustomer}>
          <Card.Text>
            {renderInputFields(fields)}
          </Card.Text>
          <div className='d-flex justify-content-center'>
            <Button variant="success" type="submit">Add</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddCustomerForm