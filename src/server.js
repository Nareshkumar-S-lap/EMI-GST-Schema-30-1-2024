require('dotenv').config(); // Load environment variables from .env file

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const custRoutes = require('./modules/customer/custRoute');
const productRoutes = require('./modules/product/productRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT , 
    host: 'localhost',
  });

  // Connect to MongoDB using the environment variable
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }

  // Register routes
  server.route(custRoutes);
  //server.route([...productRoutes]);
  server.route(productRoutes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
