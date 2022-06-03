create database orquidea_accesorios;

use orquidea_accesorios;

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price VARCHAR(5)
);

CREATE TABLE imageUrls (
    product_id INTEGER,
    PRIMARY KEY(product_id),
    imageUrl VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE materials (
    product_id INTEGER,
    PRIMARY KEY(product_id),
    material VARCHAR(20),
    color VARCHAR(10),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE sizes (
    product_id INTEGER,
    PRIMARY KEY(product_id),
    size VARCHAR(20),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

--name: string;
--imageUrls: string [];
--price: string;
--flavors: Flavor []; ---> changed flavor for materials
--sizes: Size [];