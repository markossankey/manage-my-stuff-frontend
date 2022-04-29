// react bootstrap components
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react'
import { Card, Button, Form, FormControl } from 'react-bootstrap'
import { loadCustomers } from '../../API/apiCallers'

function AddAppointment(props) {



  const { dirty, setDirty, calendarID, setCalendarID } = props
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    loadCustomers().then((customersObjList) => setCustomers(customersObjList))
  }, [dirty])

  const renderCustomerList = () => {
    return customers.map((customer, index) => {
      return <option
        key={index}
        value={customer['first_name'] + ' ' + customer['last_name']}
      />
    })
  }

  async function handleAppointment(evt) {
    evt.preventDefault()
    let form = evt.target
    let date = form[0].value
    let startDateTime = new Date(date + ' ' + form[1].value).toISOString()
    let endDateTime = new Date(date + ' ' + form[2].value).toISOString()
    let [firstName, lastName] = form[3].value.split(' ')
    let notes = form[4].value || 'None'
    let customerObj = customers.filter((customer) => customer.first_name == firstName && customer.last_name == lastName)[0]
    let summary = `Appt - ${firstName} ${lastName}`
    let description = `${customerObj['phone_number']}\n\nNotes:\n${notes}`
    let appointmentInfoForAPI = {
      'calendarId': calendarID,
      'description': description,
      'summary': summary,
      'start': {
        'dateTime': startDateTime
      },
      'end': {
        'dateTime': endDateTime
      }
    }
    let response = await gapi.client.calendar.events.insert(
      appointmentInfoForAPI
    )
    console.log('Event Posted?', response.result.status == "confirmed")
    setCalendarID('')
    setDirty(!dirty)
  }


  return (
    <Card className="bg-transparent m-2" style={{ width: "15rem", display: 'inline-block' }}>
      <Card.Body>
        <Card.Title className='text-center'>Schedule an Appointment</Card.Title>
        <Form onSubmit={handleAppointment}>
          <Card.Text>
            <Form.Label className="mt-2">Choose a date</Form.Label>
            <FormControl
              type="date"
            />
            <Form.Label className="mt-2">Choose a start time</Form.Label>
            <FormControl
              type="time"
            />
            <Form.Label className="mt-2">Choose a end time</Form.Label>
            <FormControl
              type="time"
            />
            <Form.Label className="mt-2">Customer</Form.Label>
            <FormControl
              type="text"
              list="cars"
            />
            <datalist id="cars">
              {customers && renderCustomerList()}
            </datalist>
            <Form.Label className="mt-2">Additonal Notes?</Form.Label>
            <FormControl
              as="textarea"
            />

          </Card.Text>
          <div className='d-flex justify-content-center'>
            <Button variant="success" type="submit">Add</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddAppointment