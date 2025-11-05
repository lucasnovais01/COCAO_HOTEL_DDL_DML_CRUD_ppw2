// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import Dashboard from './views/Dashboard.tsx'
import DevTools from './views/DevTools.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/devtools" element={<Layout><DevTools /></Layout>} />
    </Routes>
  )
}

export default App