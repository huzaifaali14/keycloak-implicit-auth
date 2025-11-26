# Keycloak Setup Instructions

## Configuration

Before running the application, you need to configure your Keycloak settings in `src/keycloak.js`.

### Update the following values:

```javascript
const keycloak = new Keycloak({
  url: 'YOUR_KEYCLOAK_URL',     // Your Keycloak server URL
  realm: 'YOUR_REALM',           // Your Keycloak realm name
  clientId: 'YOUR_CLIENT_ID',    // Your Keycloak client ID
});
```

### Example configuration:

```javascript
const keycloak = new Keycloak({
  url: 'https://keycloak.example.com/auth',
  realm: 'my-realm',
  clientId: 'my-client-id',
});
```

## Running the Application

1. Configure your Keycloak settings in `src/keycloak.js`
2. Start the development server:
   ```bash
   npm start
   ```
3. Open http://localhost:3000 in your browser

## How It Works

- **Not Authenticated**: Shows "Not Authenticated" message with a Login button
- **Authenticated**: Shows "Authenticated" message with username and a Logout button

The application uses Keycloak implicit flow for authentication.

## Keycloak Client Configuration

Make sure your Keycloak client is configured with:
- **Access Type**: public
- **Valid Redirect URIs**: http://localhost:3000/*
- **Web Origins**: http://localhost:3000
