import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Candidates from "./pages/Candidates"
import Jobs from "./pages/Jobs"
import JobDetails from "./pages/JobDetails"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter basename="/job-portal">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />

        <Route path="/jobs" element={<ProtectedRoute>
          <Jobs />
        </ProtectedRoute>} />

        <Route path="/jobs/:id" element={<ProtectedRoute>
          <JobDetails />
        </ProtectedRoute>} />

        <Route path="/candidates" element={<ProtectedRoute>
          <Candidates />
        </ProtectedRoute>} />

        <Route
          path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App