import { MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { motion } from 'framer-motion'

function Appointment(props) {

  let { appointment, index, needRemindersSent, setNeedRemindersSent } = props
  const [isChecked, setIsChecked] = useState(false);

  let [date, longStartTime] = appointment.start.dateTime.split('T')
  let [phoneNum, notes] = appointment.description.split('\n\n')
  let customerName = appointment.summary.split(' - ')[1]
  let startTime = longStartTime.split(/(:\d\d)-/)[0]
  let endTime = appointment.end.dateTime.split('T')[1].split(/(:\d\d)-/)[0]



  const handleCheckboxChange = () => {
    if (needRemindersSent && index in needRemindersSent) {
      let copyOfReminders = Object.assign({}, needRemindersSent)
      delete copyOfReminders[index]
      setNeedRemindersSent(copyOfReminders)
      // console.log('unchecked', copyOfReminders)
    } else {

      let copyOfReminders =
        needRemindersSent
          ? Object.assign({}, needRemindersSent)
          : {}
      // console.log('checked', copyOfReminders)
      copyOfReminders[index] = {
        fullName: customerName,
        phoneNumber: phoneNum,
        'date': date,
        start: startTime,
        end: endTime
      }
      setNeedRemindersSent(copyOfReminders)
      // console.log('checked', copyOfReminders)
    }
    setIsChecked(!isChecked)
  }
  // console.log(appointment)
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, position: 'fixed' }}
      animate={{ opacity: 1, y: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Card className="bg-transparent mt-1 mx-5 p-2 " >
        <Card.Title className="text-center">
          {date} from {startTime} to {endTime}
        </Card.Title>
        <Card.Body className="d-flex justify-content-between flex-row py-0">
          <div style={{ width: '50%' }}>
            <h3 className="m-1" style={{ width: 'fit-content' }}>{customerName}</h3>
            <p className="m-1" style={{ width: 'fit-content' }}> {phoneNum}</p>
            <p className="m-1" style={{ width: 'fit-content' }}> {notes}</p>
          </div>
          <div className='d-inline-block m-1 d-flex flex-column justify-content-center' style={{ width: '50%', textAlign: 'right' }}>
            <p>Send reminder text?</p>
            <div style={{ width: '100%' }}>
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default Appointment