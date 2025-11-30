// GraphQL endpoint configuration
// Update this with your GraphQL API endpoint URL
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql-huzaifa-ali';

// Custom headers configuration
// These headers will be included in all GraphQL requests
export const GRAPHQL_HEADERS = {
  'cdecodeuri': process.env.REACT_APP_CDECODE_URI || 'cdecode://default',
  'x-tenant-id': process.env.REACT_APP_TENANT_ID || '82b1d2fd-3136-4534-a988-a426c0a01395',
  'x-tenant-key': process.env.REACT_APP_TENANT_KEY || 'dGVuYW50LTgyYjFkMmZkLTMxMzYtNDUzNC1hOTg4LWE0MjZjMGEwMTM5NS1rZXktMTc2NDQxNDc3OTg5MTpXWWRVekJWNTJzRXE4RmEzODR4SERjb0kyVEtFN0FiMQ==',
};

