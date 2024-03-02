import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from "./pages/authentication/index"
import { ExpenseTracker } from "./pages/expense-tracker/index"
import Scanner from "./pages/scanner/scanner";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/scanner" component={Scanner} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
