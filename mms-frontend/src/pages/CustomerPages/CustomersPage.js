// react hooks
import { useState, useEffect } from 'react'

// dependancies
import _ from 'lodash'

// bootstrap components
import { Row, Col, Container } from 'react-bootstrap'

// api functions
import { loadCustomers } from '../../API/apiCallers'

// my components
import CustomerCard from '../../components/CustomerPagesComponents/CustomerCard'
import AddCustomerForm from '../../components/CustomerPagesComponents/AddCustomerForm'
import SearchBar from '../../components/CustomerPagesComponents/SearchBar'

import { motion } from 'framer-motion'

function CustomerPage(props) {

  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    const getCustomers = async () => {
      let loadedCustomers = await loadCustomers()  // returns a list of customer objects
      console.log(loadedCustomers)
      setCustomers(loadedCustomers)
    }
    getCustomers()
  }, [dirty])

  const renderCustomers = (filter) => {
    const filteredCustomers = filter == ''
      ? customers
      : customers.filter((customer) => customer.first_name.toLowerCase().includes(filter))
    return filteredCustomers.map((customer) => {
      return (
        <Col key={customer.id} lg={4} >
          <CustomerCard customer={customer} dirty={dirty} setDirty={setDirty} />
        </Col>
      )
    })
  }

  const handleSearch = (evt) => {
    setFilter(evt.target.value.toLowerCase())
  }


  return (
    <motion.div
      initial={{ opacity: 0, x: 100, position: 'fixed' }}
      animate={{ opacity: 1, x: 0, position: 'initial' }}
      exit={{ opacity: 0, x: -100, position: 'absolute', width: '100' }}
      transition={{ duration: '.3' }}
    >
      <Container>

        <h2 className='border-bottom'>Your customers</h2>
        <Row>
          <Col>
            <SearchBar handleSearch={_.debounce(handleSearch, 300)} />
            <Container className="d-flex justify-content-center gx-3 gy-3">
              <Row style={{ width: '100%' }}>
                {customers && renderCustomers(filter)}
              </Row>
            </Container>
            <AddCustomerForm setCustomers={setCustomers} customers={customers} />
          </Col>
        </Row>
      </Container>
    </motion.div>

  )
}

export default CustomerPage