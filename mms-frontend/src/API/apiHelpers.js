//dependancies
import Cookie from 'js-cookie'


const getCSRF = () => {
  return {
    withCredentials: true,
    headers: {
      'X-CSRFToken': Cookie.get('csrftoken')
    }
  }
}

const setEmailCookie = (email) => {
  Cookie.set('user_email', email)
}

const removeLoginCookies = () => {
  Cookie.remove('sessionid', {
    path: '/', domain: 'localhost'
  })
  Cookie.remove('user_email')
}

const isUserLoggedIn = () => {
  let userEmail = Cookie.get('user_email')
  return Boolean(userEmail)
}


export { getCSRF, setEmailCookie, removeLoginCookies, isUserLoggedIn }