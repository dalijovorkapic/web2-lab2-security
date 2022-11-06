//Install express server
const express = require('express');
const path = require('path');

const app = express();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
const hostname = '127.0.0.1';
// Serve only the static files form the dist directory
app.use(express.static('./dist/lab2'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lab2'}),
);

app.listen(port, hostname);

