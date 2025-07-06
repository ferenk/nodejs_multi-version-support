const express = require('express');
import { Request, Response, Application } from 'express';

var app: Application = express();
const PORT = 8088;

const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'client'), { extensions: ['html', 'mjs'] }));
app.set('views', path.join(__dirname, '..', 'client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// WEB server
app.get('/', function(_req:Request, _res:Response) {
    console.log('Rendering page... (main.html)');
    _res.render('main');
});

async function initApp()
{
    try
    {
        // start to listen
        app.listen(PORT, () => console.log(`Node.js server + multi version client demo app started on port ${PORT} !`));
    }
    catch (e)
    {
        console.error(`Error: ${e}`);
    }
}

initApp();