import { useKeycloak } from '@react-keycloak/web';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import TokenDisplay from './components/TokenDisplay';
import UsersTable from './components/UsersTable';

function Home() {
  const { keycloak } = useKeycloak();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Keycloak Authentication Test</h1>
        
        {keycloak.authenticated ? (
          <div>
            <h2 style={{ color: '#4caf50' }}>✓ Authenticated</h2>
            <p>Welcome, {keycloak.tokenParsed?.preferred_username || 'User'}!</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Link
                to="/users"
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  textDecoration: 'none',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                View Users
              </Link>
              <button 
                onClick={() => keycloak.logout()}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Logout
              </button>
            </div>
            <TokenDisplay />
          </div>
        ) : (
          <div>
            <h2 style={{ color: '#ff9800' }}>✗ Not Authenticated</h2>
            <button 
              onClick={() => keycloak.login()}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px'
              }}
            >
              Login
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

function UsersPage() {
  const { keycloak } = useKeycloak();
  const location = useLocation();

  return (
    <div className="App">
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
          <h1 style={{ margin: 0 }}>Users Management</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#4caf50', marginRight: '10px' }}>
              Welcome, {keycloak.tokenParsed?.preferred_username || 'User'}!
            </span>
            <Link
              to="/"
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                textDecoration: 'none',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                display: 'inline-block'
              }}
            >
              Home
            </Link>
            <button 
              onClick={() => keycloak.logout()}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      <div style={{ marginTop: '20px' }}>
        <UsersTable />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
