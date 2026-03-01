
const https = require('https');

const hostname = 'nocodb-nitrodb.0fdovo.easypanel.host';
const headers = {
  'xc-token': 'sXPNv2C34xYpT_3Wjc9r-d7jCSLC4mmhwVz0yRJk',
  'Content-Type': 'application/json'
};

const path = '/api/v2/tables/vwe1l91yatd7pol1/records?limit=5';

const options = { hostname, path, method: 'GET', headers };

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', e => console.error(e));
req.end();
