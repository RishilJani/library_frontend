import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Books from './components/Books/Books';
import Members from './components/Members/Members';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
