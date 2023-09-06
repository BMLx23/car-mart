import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileList from './inventory/AutomobileList';
import ModelForm from './inventory/CreateModel';
import AutomobileForm from './inventory/CreateAutomobile';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/model/new" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
