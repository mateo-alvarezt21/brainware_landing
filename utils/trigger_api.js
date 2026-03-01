
const http = require('http');

const data = JSON.stringify({
  email: 'script_test@example.com',
  name: 'Script Test User',
  type: 'Consulting',
  scope: 'Brand New',
  design: 'Yes, ready',
  budget: 'Menos de $500 USD',
  locale: 'en'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/leads',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${body}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
