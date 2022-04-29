// react hooks
import { useEffect, useState } from "react";

// boostrap components
import { Spinner, Container, Row, Col } from "react-bootstrap";

// framer-motion components
import { motion } from 'framer-motion'

// My components and functions
import AddAppointment from "../../components/SchedulePageComponents/AddAppointment";
import { getMMSCalendarId } from "../../utils/utils";


function SchedulePage() {

  const [calendarID, setCalendarID] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getMMSCalendarId().then((res) => {
        console.log('in schedule useeffct', res)
        setCalendarID(res)
      })
    }, 1000)
  }, [dirty])

  let calendarStyle = { borderRadius: '10px', opacity: '.8', border: "0", width: "60vw", height: "100%", frameborder: "0", scrolling: "no", alignSelf: 'center' }

  let loadingComponent = (
    <div className="d-flex flex-column justify-content-center align-items-center" style={calendarStyle}>
      <Spinner animation="border" variant="primary" />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Container className="d-flex justify-content-center flex-column">
        <h2 className='border-bottom'>Your schedule</h2>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            {calendarID != ''
              ? <iframe src={`https://calendar.google.com/calendar/embed?src=${calendarID}&ctz=America%2FChicago`} style={calendarStyle}></iframe>
              : loadingComponent
            }
            <AddAppointment dirty={dirty} setDirty={setDirty} calendarID={calendarID} setCalendarID={setCalendarID} />
          </Col>
        </Row>
      </Container>
    </motion.div>
  )
}


export default SchedulePage