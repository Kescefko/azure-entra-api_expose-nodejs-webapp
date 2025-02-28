const msal = require('@azure/msal-node');
const axios = require('axios');

// Dynamically fetch app registration values
const clientId = 'your-client-id'; // Retrieved from the previous CLI step
const clientSecret = 'your-client-secret'; // Retrieved from the previous CLI step
const tenantId = 'your-tenant-id'; // Your tenant ID

const config = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret: clientSecret,
  }
};

const cca = new msal.ConfidentialClientApplication(config);

const tokenRequest = {
  scopes: ['https://employeeapiapp/.default'], // API scope
};

async function getToken() {
  try {
    const response = await cca.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token: ', error);
  }
}

async function callEmployeeApi() {
  const token = await getToken();
  if (token) {
    try {
      const response = await axios.get('https://employeeapiapp/api/employee', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('API Call Error: ', error);
    }
  }
}

callEmployeeApi();
