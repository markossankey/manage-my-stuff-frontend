// react hooks
import { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'

// dependancies
import { HashRouter as Router } from 'react-router-dom'
import { initAuthInstanceAndLoadClient } from './utils/utils'

// components
import MyNavbar from './components/SharedComponents/MyNavbar'
import AnimatedRoutes from './components/SharedComponents/AnimatedRoutes'

const doGapiStuff = async () => {
  await new Promise(async (res, rej) => {
    await gapi.load('client:auth2', res)
  })
    .then(() => {
      initAuthInstanceAndLoadClient()
    })
}

function App() {

  useEffect(() => {
    doGapiStuff()
  }, [])

  return (
    <div className="App">
      <Router>
        <MyNavbar />
        <AnimatedRoutes />
      </Router>
    </div >
  );
}

export default App;

