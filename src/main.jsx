import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Cent from './center.jsx'
import PhoneUI from './left.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="w-full h-screen bg-ambient">
        {/* Desktop/Laptop UI */}
        <div className="hidden md:flex w-full h-full">
          <Cent/>
        </div>
        
        {/* Mobile/Phone UI */}
        <div className="md:hidden w-full h-full">
          <PhoneUI/>
        </div>
      </div>
    ),
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
