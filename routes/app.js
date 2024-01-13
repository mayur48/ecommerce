const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});