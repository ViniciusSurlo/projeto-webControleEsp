import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from './pages/Principal';
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/*" element={<Principal/>} />
      </Routes>
     </Router>
  )
}

export default App
