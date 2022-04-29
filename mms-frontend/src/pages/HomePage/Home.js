import { Card, Container } from 'react-bootstrap'
import { motion } from 'framer-motion'

function Home(props) {

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Container className="d-flex align-items-center flex-column">
        <Card className="d-flex p-2 text-center align-items-center" style={{ width: "30rem" }}>
          <Card.Header className="mb-2">
            <h3>About Manage My Stuff</h3>
          </Card.Header>
          <Card.Body className="m-0">
            <p>MMS is an app built to store your customer info, schedule appointments, and send follow up texts as you see fit.</p>
            <strong>Prerequisites</strong>
            <ul>
              <li className='text-left'>Must have a Google account set up with a calendar named "Manage My Stuff"</li>
              <li className='text-left'>Must allow access to to requested permissions on first login with Google Login button</li>
              <li className='text-left'>Currently can only send texts to my personal number as AWS SNS is in "sand-box" mode</li>
              <li className='text-left'>Currently can only log in with pre-specified emails as Google API is in "sand-box" mode as well</li>
            </ul>
            <p className="text-warning">Please click "Login or Signup" to get started!</p>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  )
}

export default Home