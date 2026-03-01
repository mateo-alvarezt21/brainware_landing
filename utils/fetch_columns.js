
const https = require('https');

const options = {
  hostname: 'nocodb-nitrodb.0fdovo.easypanel.host',
  path: '/api/v1/db/meta/projects/mdvacifuxpy3g5o/tables',
  method: 'GET',
  headers: {
    'xc-token': 'sXPNv2C34xYpT_3Wjc9r-d7jCSLC4mmhwVz0yRJk',
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
