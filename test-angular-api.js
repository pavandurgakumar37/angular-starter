const http = require('http');
const { exec } = require('child_process');

// Function to check if a port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/',
      method: 'GET',
      timeout: 1000
    }, () => {
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.end();
  });
}

// Function to execute a command and return the output
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Main test function
async function runTests() {
  console.log('=== Angular API Integration Test ===\n');
  
  try {
    // Check if Spring Boot API is running
    console.log('1. Checking if Spring Boot API is running on port 8080...');
    const apiRunning = await checkPort(8080);
    
    if (!apiRunning) {
      console.log('❌ Spring Boot API is not running on port 8080');
      console.log('Please start the Spring Boot API first');
      return;
    }
    
    console.log('✅ Spring Boot API is running on port 8080');
    
    // Check if Angular UI is running
    console.log('\n2. Checking if Angular UI is running on port 4200...');
    const uiRunning = await checkPort(4200);
    
    if (!uiRunning) {
      console.log('❌ Angular UI is not running on port 4200');
      console.log('Please start the Angular UI first with: cd angular-ui && npm start');
      return;
    }
    
    console.log('✅ Angular UI is running on port 4200');
    
    // Test API endpoints directly
    console.log('\n3. Testing API endpoints directly...');
    
    try {
      const usersData = await executeCommand('curl -s http://localhost:8080/api/users');
      const users = JSON.parse(usersData);
      console.log(`✅ Users API returned ${users.length} users`);
    } catch (error) {
      console.log('❌ Failed to get data from Users API:', error.message);
    }
    
    try {
      const productsData = await executeCommand('curl -s http://localhost:8080/api/products');
      const products = JSON.parse(productsData);
      console.log(`✅ Products API returned ${products.length} products`);
    } catch (error) {
      console.log('❌ Failed to get data from Products API:', error.message);
    }
    
    // Test proxy configuration
    console.log('\n4. Testing proxy configuration...');
    
    try {
      const proxiedUsersData = await executeCommand('curl -s http://localhost:4200/api/users');
      const proxiedUsers = JSON.parse(proxiedUsersData);
      console.log(`✅ Proxy is working - returned ${proxiedUsers.length} users through Angular proxy`);
    } catch (error) {
      console.log('❌ Proxy configuration issue - could not get data through proxy:', error.message);
    }
    
    try {
      const proxiedProductsData = await executeCommand('curl -s http://localhost:4200/api/products');
      const proxiedProducts = JSON.parse(proxiedProductsData);
      console.log(`✅ Proxy is working - returned ${proxiedProducts.length} products through Angular proxy`);
    } catch (error) {
      console.log('❌ Proxy configuration issue - could not get data through proxy:', error.message);
    }
    
    console.log('\n=== Test Instructions ===');
    console.log('To test the Angular UI in your browser:');
    console.log('1. Open http://localhost:4200 in your browser');
    console.log('2. Open the browser developer tools (F12)');
    console.log('3. Go to the Network tab');
    console.log('4. Click on the "Users" link in the navigation');
    console.log('5. Check if you see HTTP requests to /api/users in the Network tab');
    console.log('6. Click on the "Products" link in the navigation');
    console.log('7. Check if you see HTTP requests to /api/products in the Network tab');
    console.log('8. Check the Console tab for any error messages');
    
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the tests
runTests();