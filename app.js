const express = require('express');
require('dotenv').config({ path: ".env" });
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 80;
const corsOptions = {
  origin: 'https://csfloat.com', // Specify the allowed origin
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

(async () => {
  try {
    app.use(cors(corsOptions));
    app.use(express.static('public'));
    app.use(express.json());
    
    app.set('view engine', 'ejs');
    app.get('/api/config', (req, res) => {
      res.json({
          apiKey: process.env.API_KEY
      });
  });
    app.get('/', (req, res) => res.render('home'));
    app.get('/404', (req, res) => res.render('404')); 
    app.get('/about', (req, res) => res.render('about'))
    app.get('*', (req, res) => res.redirect('/404'));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
