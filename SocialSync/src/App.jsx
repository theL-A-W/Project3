import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Authentication from './components/Authentication'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Main />
      <Footer/>
      <Authentication/>
    </div>
  )
}

export default App
