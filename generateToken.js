// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Define a secret key (keep this safe and secure)
const secretKey = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiZXhhbXBsZVVzZXIgIiwiaWF0IjoxNzM3MTE3MzA2LCJleHAiOjE3MzcxMjA5MDZ9.v2XlPnLm4gTAE_YqE985jiBxDC2Z2Eu6nvh8-6KHbyk'; // Change this to a strong secret key

// Define the payload (data you want to include in the token)
const payload = {
    userId: '12345', // Example user ID
    username: 'exampleUser ', // Example username
};

// Define options (optional)
const options = {
    expiresIn: '1h', // Token expiration time
};

// Generate the token
const token = jwt.sign(payload, secretKey, options);

// Output the generated token
console.log('Generated JWT Token:', token);