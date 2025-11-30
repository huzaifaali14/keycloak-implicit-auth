import Keycloak from 'keycloak-js';

// TODO: Update these values with your Keycloak server details
const keycloak = new Keycloak({
  url: 'https://keycloak.cdebase.dev/', // e.g., 'https://your-domain.com/auth'
  realm: 'Realm-38098a14-9ce2-4a70-a830-4b84d456e3ae',
  clientId: 'clientId_1764414991936_w8i2e6',
});

keycloak.init({
  flow: 'implicit',                      // 🔥 required
  onLoad: 'login-required',              // required for redirect
  redirectUri: 'http://localhost:3001/', // must be placed here
});

export default keycloak;
