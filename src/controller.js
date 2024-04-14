import pool from './db,js';
import fs from 'fs';
import path from 'path';

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error'})
    }
};

export const exportCSV = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        const csvData = [['id', 'nombres', 'apellidos', 'direccion', 'correo', 'dni', 'edad', 'fecha_creacion', 'telefono']];

        rows.foreach(user => {
            csvData.push([
                user.id,
                user.nombres,
                user.apellidos,
                user.direccion,
                user.correo,
                user.dni,
                user.edad,
                user.fecha_creacion.toISOSString(),slice(0, 10),
                user.telefono
            ]);
        });
        const csvContenido = csvData.map(row => row.join(',')).join('\n');
        const csvFile = path.join(__dirname, '..', 'usuarios.csv');

        await fs.promises.writeFile(csvFile, csvContenido);
        res.download(csvFile, 'usuarios.csv');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error exportando archivos usuarios'});
    }
};

export const importCSV = async (req, res) => {
    try {
        const csvFile = path.join(__dirname, '...', 'usuarios.csv');
        const csvData = await fs.promises.readFile(csvFile, 'utf-8');
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

        res.json({ message: 'Importado con éxito!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al importar!'});
    }
};