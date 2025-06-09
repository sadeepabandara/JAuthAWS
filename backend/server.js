const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
