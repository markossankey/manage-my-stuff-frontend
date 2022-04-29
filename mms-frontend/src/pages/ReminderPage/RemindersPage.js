import { gapi } from 'gapi-script';
import { useState } from 'react';
import { Button, Card, Form, FormControl, Container } from 'react-bootstrap';
import Appointment from '../../components/ReminderPageComponents/Appointment';
import { sendTextReminders } from '../../API/apiCallers';
import { motion } from 'framer-motion'


import MyNavbar from "../../components/SharedComponents/MyNavbar"
import RemindersSentModal from '../../components/ReminderPageComponents/RemindersSentModal';

function RemindersPage(props) {

  const [appointments, setAppointments] = useState(null);
  const [needRemindersSent, setNeedRemindersSent] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [successfullReminders, setSuccessfullReminders] = useState(null);

  const getAppointments = async (evt) => {
    evt.preventDefault()
    let startDay = new Date(evt.target[0].value).toISOString();
    let lastDay = new Date(evt.target[1].value).toISOString();
    let googleEventsResponse = await gapi.client.calendar.events.list({
      'calendarId': 'dqtctkcc1k10e9288jpmluplig@group.calendar.google.com',
      'timeMax': lastDay,  //last date that we want to get, need to be a ISO dateTime
      'timeMin': startDay //earliest date that we want to get, need to be a ISO dateTime
    })
    setAppointments(googleEventsResponse.result.items)
  }

  const renderAppointments = () => {
    return (
      <div>
        <h2 className="text-center">Verify customers that you'd like to receive reminder texts</h2>
        {appointments
          .filter((appointment) => {
            return appointment.summary
              ? appointment.summary.startsWith('Appt -')
              : false
          })
          .map((appointment, index) => {
            return (
              <Appointment
                key={index}
                appointment={appointment}
                needRemindersSent={needRemindersSent}
                setNeedRemindersSent={setNeedRemindersSent}
                index={index}
              />
            )
          })
        }
      </div>
    )
  }

  const handleSendReminders = async () => {
    let response = await sendTextReminders(needRemindersSent)
    console.log('handleSendreminders', response.data)
    setSuccessfullReminders(response.data[0])
    setShowModal(true)
  }


  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Container>
        <h2 className='border-bottom'>Send Reminders</h2>
        <RemindersSentModal showModal={showModal} successfullReminders={successfullReminders} />
        <div className='card p-2 m-auto' style={{ width: 'fit-content' }}>
          <Form onSubmit={getAppointments} className="d-flex justify-content-center">
            <div className="mx-2 d-inline-block">
              <FormControl
                type="date"
                style={{ width: '10rem' }}
              />
            </div>
            <span className='align-middle'>to</span>
            <div className="mx-2 d-inline-block">
              <FormControl
                type="date"
                style={{ width: '10rem' }}
              />
            </div>
            <div className='d-flex align-items-center'>
              <Button variant="success" type="submit">Get Appointments</Button>
            </div>
          </Form>
        </div>
        {
          appointments
          &&
          (<div className='d-flex justify-content-center m-3'>
            <Button
              className='m-2'
              variant="primary"
              type="submit"
              onClick={handleSendReminders}
            >Send Reminders</Button>
          </div>)
        }
        {appointments && renderAppointments()}
      </Container>
    </motion.div>
  )
}

export default RemindersPage