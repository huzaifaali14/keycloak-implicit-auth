import { useKeycloak } from '@react-keycloak/web';
import React, { useState } from 'react';
import './TokenDisplay.css';

function TokenDisplay() {
  const { keycloak } = useKeycloak();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!keycloak.authenticated || !keycloak.token) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(keycloak.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="token-display-container">
      <div className="token-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="token-label">Authentication Token</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            className="token-copy-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            title="Copy token"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <span className="token-toggle">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="token-content">
          <pre className="token-text">{keycloak.token}</pre>
          {keycloak.tokenParsed && (
            <div className="token-parsed">
              <h4>Token Payload:</h4>
              <pre className="token-json">{JSON.stringify(keycloak.tokenParsed, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TokenDisplay;
