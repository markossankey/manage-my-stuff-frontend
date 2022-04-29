import { GoogleLogout } from 'react-google-login'
import { setEmailCookie } from '../../../API/apiHelpers'
import { handleGLogout } from '../../../API/apiCallers'
import { useNavigate } from 'react-router-dom'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLogoutButton(props) {

  const { loggedIn, setLoggedIn } = props

  let navigate = useNavigate()

  const gLogoutSuccess = () => {
    setEmailCookie('')
    handleGLogout()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={gLogoutSuccess}
      />
    </div>
  )
}

export default GoogleLogoutButton