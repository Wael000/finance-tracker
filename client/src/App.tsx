import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashbboard from './pages/dashboard'
import Auth from './pages/auth'
import { FinancialRecordProvider } from './contexts/financial-record-context'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <FinancialRecordProvider>
            <Dashbboard />
          </FinancialRecordProvider>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
