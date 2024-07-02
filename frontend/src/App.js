import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import CreateAccount from "./login/CreateAccount";
import ForgotPassword from "./login/ForgotPassword";
import Activity from "./telas/Activity";
import User from "./telas/User";
import EditUser from './telas/EditUser';
import ResendValidatoin from "./login/ResendValidation";
import UserValidation from "./login/UserValidation";
import ResetPassword from "./telas/ResetPassword";
import ResetPasswordForgot from "./login/ResetPasswordForgot"
import CreateActivity from "./telas/CreateActivity";
import EditActivity from "./telas/EditActivity";
import "./css/styles.css";


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/create-account" element={< CreateAccount />} />
          <Route path="/forgot-password" element={< ForgotPassword />} />
          <Route path="/user-validation" element={< UserValidation />} />
          <Route path="/resend-validation" element={< ResendValidatoin />} />
          <Route path="/activity" element={< Activity />} />
          <Route path="/create-activity" element={< CreateActivity />} />
          <Route path="/user" element={< User />} />
          <Route path="/edit-user/:id" element={< EditUser />} />
          <Route path="/reset-password" element={< ResetPassword />} />
          <Route path="/change-password" element={< ResetPasswordForgot />} />
          <Route path="/edit-activity/:id" element={< EditActivity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;