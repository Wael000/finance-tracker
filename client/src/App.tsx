import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Dashbboard</h1>} />
        <Route path="/auth" element={<h1>Sign in</h1>} />
      </Routes>
    </Router>
  )
}

export default App
