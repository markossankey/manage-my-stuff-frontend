import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Home from '../../pages/HomePage/Home'
import CustomersPage from '../../pages/CustomerPages/CustomersPage'
import CustomerPage from '../../pages/CustomerPages/CustomerPage'
import SchedulePage from '../../pages/SchedulePage/SchedulePage'
import RemindersPage from '../../pages/ReminderPage/RemindersPage'
import ProtectedRoutes from './ProtectedRoutes'

import { AnimatePresence } from 'framer-motion'
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage'


function AnimatedRoutes(props) {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/customers/" >
          <Route path="" element={
            <ProtectedRoutes>
              <CustomersPage />
            </ProtectedRoutes>
          } />
          <Route path=":customerID" element={
            <ProtectedRoutes>
              <CustomerPage />
            </ProtectedRoutes>
          } />
        </Route>
        <Route path='/schedule' element={
          <ProtectedRoutes>
            <SchedulePage />
          </ProtectedRoutes>
        } />
        <Route path='/send-reminders' element={
          <ProtectedRoutes>
            <RemindersPage />
          </ProtectedRoutes>
        } />
        <Route path='/profile' element={
          <ProtectedRoutes>
            <UserProfilePage />
          </ProtectedRoutes>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes