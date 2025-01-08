import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CenterComponent from './CenterComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-secondary-subtle'>
      <CenterComponent/>
    </div>
  )
}

export default App
