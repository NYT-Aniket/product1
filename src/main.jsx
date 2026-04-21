import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cent from './center.jsx'
import PhoneUI from './left.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="w-full h-screen">
        {/* Desktop/Laptop UI */}
        <div className="hidden md:flex w-full h-full">
          <Cent/>
        </div>
        
        {/* Mobile/Phone UI */}
        <div className="md:hidden w-full h-full">
          <PhoneUI/>
        </div>
      </div>
  </StrictMode>,
)
