import Keycloak from 'keycloak-js';

// TODO: Update these values with your Keycloak server details
const keycloak = new Keycloak({
  url: 'https://keycloak.cdebase.dev/', // e.g., 'https://your-domain.com/auth'
  realm: 'Realm-178a4fb5-6ff6-4d2a-b904-8166d4f88cd7',
  clientId: 'clientId_1764180766129_xwu1db',
});

keycloak.init({
  flow: 'implicit',                      // 🔥 required
  onLoad: 'login-required',              // required for redirect
  redirectUri: 'http://localhost:3001/', // must be placed here
});

export default keycloak;
