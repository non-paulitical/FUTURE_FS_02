import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Home, Analytics } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='analytics' element={<Analytics />} />
      </Routes>
    </Router>
  )
}

export default App
