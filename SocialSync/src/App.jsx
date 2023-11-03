import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Authentication from './components/Authentication'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Authentication/>
    </div>
  )
}

export default App
