import './App.css';
import SignupPage from './components/SignupPage';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route exact path="/" component={DashboardPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
