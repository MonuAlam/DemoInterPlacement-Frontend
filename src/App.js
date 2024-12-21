import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // use Routes instead of Switch

import CompanyForm from './Component/CompanyForm';
import CompanyList from './Component/CompanyList';
import EditCompanyPage from './Component/EditCompanyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Company Management</h1>
        <div className="form-section">
          <CompanyForm />
        </div>
        <div className="list-section">
          <CompanyList />
        </div>
        <Routes>
        <Route path="/edit-company/:id" element={<EditCompanyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
