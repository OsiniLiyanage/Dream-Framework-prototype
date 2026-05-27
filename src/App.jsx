import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import DreamEntry from './pages/PathA/DreamEntry'
import DreamValidation from './pages/PathA/DreamValidation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/path-a" element={<DreamEntry />} />
        <Route path="/path-a/validate" element={<DreamValidation />} />
      </Routes>
    </BrowserRouter>
  )
}