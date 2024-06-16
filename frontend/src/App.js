import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import CreateAccount from "./login/CreateAccount";
import ForgotPassword from "./login/ForgotPassword";
import "./css/styles.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;