import http from 'http';
import { getUsuarios, exportCSV, importCSV } from './controller';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/users') {
        getUsuarios(req, res);
    } else if (req.url === '/api/users/export') {
        exportCSV(req, res);
    } else if (req.url === '/api/users/import') {
        importCSV(req, res);
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Ruta no encontrada'}));
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});