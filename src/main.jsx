import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './contexts/UserContext.jsx'
import { CourseContextProvider } from './contexts/CourseContext.jsx'

export const server = 'https://ed-tech-7m0e.onrender.com';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CourseContextProvider>
    <UserContextProvider>
     
        <App />
      </UserContextProvider>
      </CourseContextProvider>
   
  </StrictMode>
)
