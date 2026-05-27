import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import DreamEntry from './pages/PathA/DreamEntry'
import DreamValidation from './pages/PathA/DreamValidation'
import Vision from './pages/PathA/Vision'
import Mission from './pages/PathA/Mission'
import Milestone from './pages/PathA/Milestone'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/path-a" element={<DreamEntry />} />
        <Route path="/path-a/validate" element={<DreamValidation />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/milestone" element={<Milestone />} />
      </Routes>
    </BrowserRouter>
  )
}