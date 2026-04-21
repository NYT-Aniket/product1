import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Desktop from './center.jsx'
import Mobile from './left.jsx'
import NotFound from './pages/NotFound.jsx'

const PortfolioPage = () => (
  <div className="bg-ambient" style={{ width: '100%', height: '100dvh', overflow: 'hidden' }}>
    {/* Desktop ≥ 768px */}
    <div className="hidden md:block w-full h-full">
      <Desktop />
    </div>
    {/* Mobile < 768px */}
    <div className="md:hidden w-full h-full">
      <Mobile />
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <PortfolioPage />,
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