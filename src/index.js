import http from 'http';
import { getUsers, exportToCSV, importFromCSV } from './controller.js';

const server = http.createServer((req, res) => {
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url === '/api/users/export' && req.method === 'GET') {
    exportToCSV(req, res);
  } else if (req.url === '/api/users/import' && req.method === 'POST') {
    importFromCSV(req, res);
  } else {
    res.status(404).json({ error: 'Endpoint no encontrado' });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
