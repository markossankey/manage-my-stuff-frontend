import { motion } from 'framer-motion'
import { Container } from 'react-bootstrap'

function UserProfilePage(props) {



  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Container className="d-flex justify-content-center flex-column">
        <h2 className='border-bottom'>Your settings</h2>
      </Container>
    </motion.div>
  )
}

export default UserProfilePage