-- Crear una base de datos
CREATE DATABASE IF NOT EXISTS prueba;

USE prueba;

-- Tabla items
CREATE TABLE IF NOT EXISTS items(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    stock INT UNSIGNED,
    PRIMARY KEY (id)
);

-- Insertar 3 registros en la tabla items
INSERT INTO items(nombre, categoria, stock)
VALUES  ('Fideos', 'Harina', 20),
        ('Leche', 'Lácteos', 30),
        ('Crema', 'Lácteos', 15);


-- Listar todos los registos
SELECT * FROM items;

-- Borrar el item con id = 1
DELETE FROM items 
WHERE id = 1;

-- Actualizar registros
UPDATE items
SET stock = 45
WHERE id = 2;

-- Listar registros actulizados registros 
SELECT * FROM items;
SELECT * FROM items
WHERE id = 2;