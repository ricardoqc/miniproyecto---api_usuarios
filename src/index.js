import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getUsers, exportToCSV, importFromCSV } from '../src/controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, '..', 'public_html', 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error al cargar el archivo');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.url === '/styles.css') {
    const filePath = path.join(__dirname, '..', 'public_html', 'styles.css');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(404);
        res.end('Archivo no encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(content);
      }
    });
  } else if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url === '/api/users/export' && req.method === 'GET') {
    exportToCSV(req, res);
  } else if (req.url === '/import.html' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, '..', 'public_html', 'import.html'), (err, content) => {
      if (err) {
        console.error('Error leendo archivo:', err);
        res.writeHead(500);
        res.end('Error al cargar archivo');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
    importFromCSV(req, res);
  } else {
    res.status(404).json({ error: 'Endpoint no encontrado' });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
