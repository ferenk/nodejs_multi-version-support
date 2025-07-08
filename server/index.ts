const express = require('express');
import { Request, Response, Application, NextFunction } from 'express';

var app: Application = express();

const DEfAULT_WEB_PORT = 8088;
const PORT = process.env.PORT || DEfAULT_WEB_PORT;

import fs = require('fs');
const path = require('path');


app.use('/client_versions', express.static(path.join(__dirname, '..', 'client_versions'), { extensions: ['html', 'mjs'] }));
app.use('/',express.static(path.join(__dirname, '..', 'client'), { extensions: ['html', 'mjs'] }));
app.set('views', path.join(__dirname, '..', 'client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// WEB server
app.get('/', function(_req:Request, _res:Response) {
    console.log('Rendering page... (main.html)');
    _res.render('main');
});

// Add API endpoint for file listing
app.get('/api/client_versions', (req, res) => {
    const clientVersionsPath = path.join(__dirname, '..', 'client_versions');

    try {
        const files = fs.readdirSync(clientVersionsPath);
        const fileList = files.map(file => {
            const filePath = path.join(clientVersionsPath, file);
            const stats = fs.statSync(filePath);

            return {
                name: file,
                type: stats.isDirectory() ? 'directory' : 'file',
                size: stats.size,
                modified: stats.mtime
            };
        });

        res.json(fileList);
    } catch (error) {
        res.status(500).json({error: 'Unable to read directory'});
    }
});

// 404 handler - must be placed after all other routes
app.use((req: Request, res: Response, next: NextFunction) => {
    const errorMsg = `The requested resource ${req.originalUrl} was not found on this server.`;
    console.log(`ERROR: Not found. ${errorMsg}`);
    res.status(404).json({
        error: 'Not Found',
        message: errorMsg,
        status: 404
    });
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