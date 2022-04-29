import { GoogleLogin } from 'react-google-login'
import { handleGLoginOrSignup } from '../../../API/apiCallers'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLoginButton(props) {

  const { loggedIn, setLoggedIn } = props

  const gLoginSuccess = async (res) => {
    console.log('Login success.. current user:', res.profileObj)
    await handleGLoginOrSignup(res.profileObj)
    setLoggedIn(true)
  }

  const gLoginFailure = (res) => {
    console.log('Login failed', res)
    props.setIsGapiLoaded(true); console.log('loaded in button')
  }

  return (
    <div id="SignInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login or Signup"
        onSuccess={gLoginSuccess}
        onFailure={gLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        scope={"https://www.googleapis.com/auth/calendar"}
        discoveryDocs={['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']}
      />
    </div>
  )
}

export default GoogleLoginButton