import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="min-h-screen bg-gray-900">
          <AppRoutes />
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
