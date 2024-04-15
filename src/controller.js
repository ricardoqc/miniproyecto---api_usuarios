import pool from './db.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al recuperar usuarios' });
  }
};

export const exportToCSV = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    const csvData = [['id', 'nombres', 'apellidos', 'direccion', 'correo', 'dni', 'edad', 'fecha_creacion', 'telefono']];

    rows.forEach(user => {
      csvData.push([
        user.id,
        user.nombres,
        user.apellidos,
        user.direccion,
        user.correo,
        user.dni,
        user.edad,
        user.fecha_creacion.toISOString().slice(0, 10),
        user.telefono
      ]);
    });

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const csvFilePath = path.join(__dirname, '..', 'usuarios.csv');

    await fs.promises.writeFile(csvFilePath, csvContent);
    // Asegúrate de que la respuesta maneje el archivo correctamente
    const fileExists = await fs.promises.access(csvFilePath, fs.constants.F_OK).then(() => true).catch(() => false);
    if (fileExists) {
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${path.basename(csvFilePath)}"`
      });
      fs.createReadStream(csvFilePath).pipe(res);
    } else {
      throw new Error('Archivo no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al exportar usuarios a CSV' });
  }
};

export const importFromCSV = async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, '..', 'usuarios.csv');
    const fileExists = await fs.promises.access(csvFilePath, fs.constants.F_OK).then(() => true).catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ error: 'Archivo CSV no encontrado' }); // Usar return para finalizar aquí
    }

    const csvData = await fs.promises.readFile(csvFilePath, 'utf8');
    const rows = csvData.trim().split('\n').slice(1).map(row => row.split(','));
    let usersImported = 0;

    for (const [id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono] of rows) {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE id = ? OR correo = ?', [id, correo]);
      if (existingUser.length === 0) {
        await pool.query('INSERT INTO users (id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono]);
        usersImported++;
      }
    }
    console.log("Enviando respuesta final...");
    res.json({ message: `Usuarios importados correctamente: ${usersImported}` });
  } catch (error) {
    console.error('Error al importar:', error);
    if (!res.headersSent) {
      console.log("Enviando respuesta final...");
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}; // No funciona :(