import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LocalProvider } from "./context/LocalContext";
import PrivateRoute from "./routes/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import ViewCategoryExpenses from "./pages/ViewCategoryExpenses";

function App() {
  return (
    <AuthProvider>
      <LocalProvider>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route exact path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
          <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route exact path="/expenses/:category" element={<PrivateRoute><ViewCategoryExpenses /></PrivateRoute>} />
        </Routes>
      </LocalProvider>
    </AuthProvider>
  );
}

export default App;