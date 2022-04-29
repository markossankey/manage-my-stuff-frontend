//gapi is a Google library for interacting with Google utilizing sub libraries such as auth2 (authentication)
// and client (interacting with Google APIs) 
import { gapi } from "gapi-script"

// Client id assigned form Google developers console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

// API key assigned form Google developers console
const API_KEY = process.env.REACT_APP_CALENDAR_KEY

// What api we want to use (https://developers.google.com/apis-explorer/ for a list of all APIs and discovery docs)
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
]

// What priveledges we want from the user (provided in google console based on what privileges you want for your user, as a string seperated by spaces)
const SCOPE = "https://www.googleapis.com/auth/calendar"

const calendarName = "Manage My Stuff"
// let userCalendars
let calId

//first need to load gapi,
//next provide a callback function to check if user is signed in
//if user is signed in, then call get auth instance
//else call init

export const getGAccessToken = async () => {
  const accessToken = await gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
  return accessToken
}

export const initAuthInstanceAndLoadClient = async () => {
  await gapi.auth2.init({
    apiKey: API_KEY,
    client_id: CLIENT_ID,
    scope: SCOPE,
    discoveryDocs: DISCOVERY_DOCS
  }).then(async (res) => {
    loadGapiClient()
  })
}

export const loadGapiClient = async () => {
  let accessToken = await getGAccessToken()
  console.log('utils inclient', accessToken)
  gapi.client.setToken({ access_token: accessToken })
  let grantedScope = await gapi.auth2.getAuthInstance().currentUser.get().getGrantedScopes()
  console.log('utils granted scopes', grantedScope)
  await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest')
  return
}

export const getMMSCalendarId = async () => {
  await loadGapiClient()
  let response = await gapi.client.calendar.calendarList.list({})
  let userCalendars = await response.result.items
  for (let i in userCalendars) {
    if (userCalendars[i].summary == calendarName) {
      console.log('utils mms cal', userCalendars[i].id)
      return userCalendars[i].id
    }
  }
}
