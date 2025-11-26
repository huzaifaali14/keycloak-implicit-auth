import './App.css';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak } = useKeycloak();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Keycloak Authentication Test</h1>
        
        {keycloak.authenticated ? (
          <div>
            <h2 style={{ color: '#4caf50' }}>✓ Authenticated</h2>
            <p>Welcome, {keycloak.tokenParsed?.preferred_username || 'User'}!</p>
            <button 
              onClick={() => keycloak.logout()}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px'
              }}
            >
              Logout
            </button>
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

export default App;
