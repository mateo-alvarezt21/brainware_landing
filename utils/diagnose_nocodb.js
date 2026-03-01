
const https = require('https');

const hostname = 'nocodb-nitrodb.0fdovo.easypanel.host';
const headers = {
  'xc-token': 'sXPNv2C34xYpT_3Wjc9r-d7jCSLC4mmhwVz0yRJk',
  'Content-Type': 'application/json'
};

const paths = [
  '/api/v2/meta/views/vwe1l91yatd7pol1', // Get view meta to find table ID
  '/api/v1/db/meta/views/vwe1l91yatd7pol1',

];

paths.forEach(path => {
  const options = { hostname, path, method: 'GET', headers };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n--- PATH: ${path} ---`);
      console.log(`STATUS: ${res.statusCode}`);
      try {
        const json = JSON.parse(data);
        // Log truncated output to avoid massive spam
        const str = JSON.stringify(json, null, 2);
        console.log(str.length > 500 ? str.substring(0, 500) + '...' : str);
      } catch (e) {
        console.log(data.substring(0, 500));
      }
    });
  });
  req.on('error', e => console.error(`Error for ${path}: ${e.message}`));
  req.end();
});
