import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { useAuth0 } from '@auth0/auth0-react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UserCalendar from './components/UserCalendar'
// import Authentication from './components/Authentication'




function App() {
const {isAuthenticated, getAccessTokenSilently}= useAuth0()
  
useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // You now have the access token here
          console.log(token);
        } catch (error) {
          console.error('Error getting access token', error);
        }
      }
    };
getToken()
  }, [isAuthenticated, getAccessTokenSilently]
  )

  return (
    <div>
      <Header />
      <Main/>
      {/* <Footer/> */}

    </div>
  )
}

export default App
