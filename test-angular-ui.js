const puppeteer = require('puppeteer');

async function testAngularUI() {
  console.log('Starting Angular UI test...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Enable console logging from the page
    page.on('console', msg => {
      console.log('Browser Console:', msg.text());
    });
    
    page.on('pageerror', error => {
      console.error('Browser Page Error:', error.message);
    });
    
    // Navigate to the users page
    console.log('Navigating to http://localhost:4200/users');
    await page.goto('http://localhost:4200/users', { waitUntil: 'networkidle2' });
    
    // Wait for 3 seconds to allow components to load
    console.log('Waiting for components to load...');
    await page.waitForTimeout(3000);
    
    // Check if the test data is displayed
    const usersTable = await page.$('.users-table');
    const loadingElement = await page.$('.loading');
    const errorElement = await page.$('.error');
    const noDataElement = await page.$('.no-data');
    
    console.log('Users table found:', !!usersTable);
    console.log('Loading element found:', !!loadingElement);
    console.log('Error element found:', !!errorElement);
    console.log('No data element found:', !!noDataElement);
    
    if (usersTable) {
      const rows = await page.$$('tbody tr');
      console.log('Number of user rows found:', rows.length);
      
      if (rows.length > 0) {
        const firstRowText = await page.evaluate(el => el.textContent, rows[0]);
        console.log('First row content:', firstRowText);
      }
    }
    
    // Now test the products page
    console.log('\nNavigating to http://localhost:4200/products');
    await page.goto('http://localhost:4200/products', { waitUntil: 'networkidle2' });
    
    // Wait for 3 seconds to allow components to load
    console.log('Waiting for components to load...');
    await page.waitForTimeout(3000);
    
    // Check if the test data is displayed
    const productsTable = await page.$('.products-table');
    const loadingElement2 = await page.$('.loading');
    const errorElement2 = await page.$('.error');
    const noDataElement2 = await page.$('.no-data');
    
    console.log('Products table found:', !!productsTable);
    console.log('Loading element found:', !!loadingElement2);
    console.log('Error element found:', !!errorElement2);
    console.log('No data element found:', !!noDataElement2);
    
    if (productsTable) {
      const rows = await page.$$('tbody tr');
      console.log('Number of product rows found:', rows.length);
      
      if (rows.length > 0) {
        const firstRowText = await page.evaluate(el => el.textContent, rows[0]);
        console.log('First row content:', firstRowText);
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

testAngularUI();