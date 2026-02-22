#!/bin/bash

echo "Testing Angular UI at http://localhost:4200"
echo "=========================================="

# Test if the Angular app is accessible
echo "1. Testing if Angular app is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4200 | grep -q "200"; then
    echo "✓ Angular app is accessible (HTTP 200)"
else
    echo "✗ Angular app is not accessible"
    exit 1
fi

# Test if the users page is accessible
echo ""
echo "2. Testing if /users route is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/users | grep -q "200"; then
    echo "✓ /users route is accessible (HTTP 200)"
else
    echo "✗ /users route is not accessible"
fi

# Test if the products page is accessible
echo ""
echo "3. Testing if /products route is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/products | grep -q "200"; then
    echo "✓ /products route is accessible (HTTP 200)"
else
    echo "✗ /products route is not accessible"
fi

# Test if the API endpoints are accessible through the proxy
echo ""
echo "4. Testing if API endpoints are accessible through proxy..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/api/users | grep -q "200"; then
    echo "✓ /api/users endpoint is accessible through proxy (HTTP 200)"
else
    echo "✗ /api/users endpoint is not accessible through proxy"
fi

if curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/api/products | grep -q "200"; then
    echo "✓ /api/products endpoint is accessible through proxy (HTTP 200)"
else
    echo "✗ /api/products endpoint is not accessible through proxy"
fi

# Test if the Spring Boot API is directly accessible
echo ""
echo "5. Testing if Spring Boot API is directly accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/users | grep -q "200"; then
    echo "✓ Spring Boot /api/users endpoint is directly accessible (HTTP 200)"
else
    echo "✗ Spring Boot /api/users endpoint is not directly accessible"
fi

if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/products | grep -q "200"; then
    echo "✓ Spring Boot /api/products endpoint is directly accessible (HTTP 200)"
else
    echo "✗ Spring Boot /api/products endpoint is not directly accessible"
fi

echo ""
echo "=========================================="
echo "Test completed. Please check the browser console at:"
echo "http://localhost:4200/users"
echo "http://localhost:4200/products"
echo ""
echo "Look for the following console messages:"
echo "- App component initialized"
echo "- Router event: NavigationStart"
echo "- UsersComponent: Constructor called"
echo "- UsersComponent: ngOnInit called"
echo "- UsersComponent: Loading test data"
echo "- UsersComponent: Test data loaded, users: [Array]"
echo ""
echo "If you don't see these messages, there might be an issue with:"
echo "1. Component initialization"
echo "2. Routing configuration"
echo "3. JavaScript errors in the browser"