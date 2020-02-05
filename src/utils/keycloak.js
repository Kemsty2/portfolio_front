const config = {
    "realm": "digital-app",
    "url": "https://keycloak.orange.cm/auth",
    "ssl-required": "external",
    "resource": "portfolio_dev",
    "clientId": "portfolio_dev",
    "public-client": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0
  };

export default config;