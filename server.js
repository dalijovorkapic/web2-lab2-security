//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/lab2'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lab2'}),
);

app.listen(process.env.PORT || 4080);
