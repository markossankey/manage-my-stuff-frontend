// dependancies
import axios from "axios"

// helpers
import { getCSRF, setEmailCookie, removeLoginCookies } from "./apiHelpers"

const BASE_URL = 'http://localhost:8000/mms-api'

const handleLogin = async (evt) => {
  evt.preventDefault()
  const loginData = {
    username: evt.target[0].value,
    password: evt.target[1].value
  }
  return await axios.post(`${BASE_URL}/login`, loginData, getCSRF()).then((response) => {
    window.location.href = '/'
  })
}

const loadCustomers = async () => {
  return await axios.get(`${BASE_URL}/customers`, getCSRF()).then((response) => response.data)
}

const addCustomer = async (evt) => {
  evt.preventDefault()
  let newCustomerData = {
    first_name: evt.target[0].value,
    last_name: evt.target[1].value,
    phone_number: evt.target[2].value
  }
  return await axios.post(`${BASE_URL}/customers/`, newCustomerData, getCSRF()).then((response) => {
    return response.data
  })
}

const getCustomer = async (customerID) => {
  return await axios.get(`${BASE_URL}/customers/${customerID}`, getCSRF()).then((response) => {
    return response.data
  })
}

const updateCustomer = async (customerID, data) => {
  return await axios.patch(`${BASE_URL}/customers/${customerID}/`, data, getCSRF()).then((response) => {
    return response.data
  })
}

const deleteCustomer = async (customerID) => {
  return await axios.delete(`${BASE_URL}/customers/${customerID}/`, getCSRF()).then((response) => response)
}


const handleGLoginOrSignup = async (googleProfileObj) => {
  return await axios.post(`${BASE_URL}/login`, googleProfileObj, getCSRF()).then((response) => {
    setEmailCookie(response.data.email)
  })
}

const handleGLogout = async () => {
  return await axios.post(`${BASE_URL}/logout`, {}, getCSRF()).then((response) => {
    removeLoginCookies()
  })
}

const sendTextReminders = async (reminders) => {
  return await axios.post(`${BASE_URL}/send-texts`, reminders, getCSRF()).then((response) => {
    return response
  })
}

export { handleLogin, loadCustomers, addCustomer, handleGLoginOrSignup, handleGLogout, sendTextReminders, getCustomer, updateCustomer, deleteCustomer }