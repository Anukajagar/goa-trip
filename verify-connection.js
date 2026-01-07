// Verification script for MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Verifying MongoDB Configuration...\n');

// Check environment variables
console.log('1. Checking environment variables:');
if (!process.env.MONGODB_URI) {
  console.error('   ❌ MONGODB_URI is not set in .env file');
  console.error('   Please create a .env file with:');
  console.error('   MONGODB_URI=mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa');
  process.exit(1);
} else {
  console.log('   ✅ MONGODB_URI is set');
  
  // Mask password in output
  const maskedUri = process.env.MONGODB_URI.replace(/:(.*?)@/, ':****@');
  console.log(`   Connection string: ${maskedUri}`);
}

if (!process.env.PORT) {
  console.log('   ⚠️  PORT not set, will use default: 5000');
} else {
  console.log(`   ✅ PORT is set to: ${process.env.PORT}`);
}

// Verify connection string format
console.log('\n2. Verifying connection string format:');
const uri = process.env.MONGODB_URI;
const uriPattern = /^mongodb\+srv:\/\/[^:]+:[^@]+@[^/]+\/[^?]+/;

if (uriPattern.test(uri)) {
  console.log('   ✅ Connection string format is valid');
  
  // Parse components
  const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)$/);
  if (match) {
    const [, username, password, cluster, database] = match;
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${'*'.repeat(password.length)}`);
    console.log(`   Cluster: ${cluster}`);
    console.log(`   Database: ${database}`);
  }
} else {
  console.error('   ❌ Connection string format is invalid');
  console.error('   Expected format: mongodb+srv://username:password@cluster.mongodb.net/database');
  process.exit(1);
}

// Test connection
console.log('\n3. Testing MongoDB connection:');
const options = {
  serverSelectionTimeoutMS: 10000, // 10 seconds for test
  socketTimeoutMS: 15000,
  connectTimeoutMS: 10000,
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('   ✅ Successfully connected to MongoDB!');
    console.log(`   Database: ${mongoose.connection.db.databaseName}`);
    console.log(`   Ready State: ${mongoose.connection.readyState} (1 = connected)`);
    mongoose.connection.close();
    console.log('\n✅ All checks passed! Your MongoDB configuration is correct.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('   ❌ Connection failed:', error.message);
    console.error('\n   Common issues:');
    console.error('   - IP address not whitelisted in MongoDB Atlas');
    console.error('   - Incorrect username or password');
    console.error('   - Cluster is paused or not accessible');
    console.error('   - Network/firewall blocking connection');
    console.error('\n   Please check:');
    console.error('   1. MongoDB Atlas Network Access (IP Whitelist)');
    console.error('   2. MongoDB Atlas cluster is running');
    console.error('   3. Username and password are correct');
    process.exit(1);
  });

