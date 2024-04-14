import pool from './db.js';
import path from 'path';

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
    res.download(csvFilePath, 'usuarios.csv');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al exportar usuarios a CSV' });
  }
};

export const importFromCSV = async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, '..', 'usuarios.csv');
    const csvData = await fs.promises.readFile(csvFilePath, 'utf8');
    const rows = csvData.trim().split('\n').slice(1).map(row => row.split(','));

    for (const [id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono] of rows) {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE id = ? OR correo = ?', [id, correo]);
      if (existingUser.length === 0) {
        await pool.query(
          'INSERT INTO users (id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono]
        );
      }
    }

    res.json({ message: 'Usuarios importados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al importar usuarios desde CSV' });
  }
};