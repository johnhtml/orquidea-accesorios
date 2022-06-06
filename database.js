var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Password123#@!',
  database: process.env.MYSQL_DATABASE || 'orquidea_accesorios'
});

/*
ejecutar para iniciar el servicio
sudo service mysql start //habilitar permisos
sudo mysql -u root -p //abrir el shell de mysql
*/

connection.connect();

function getProducts(callback) {
  const query = `
    SELECT 

    products.product_id, products.name,
    products.price,

    GROUP_CONCAT(imageUrls.imageUrl) as imageUrls,
    GROUP_CONCAT(materials.material) as materials,
    GROUP_CONCAT(materials.color) as colors,
    GROUP_CONCAT(sizes.size) as sizes

    FROM products

    INNER JOIN
    imageUrls
    ON
    products.product_id = imageUrls.product_id


    INNER JOIN
    materials
    ON
    products.product_id = materials.product_id

    INNER JOIN
    sizes
    ON
    products.product_id = sizes.product_id
    
    GROUP BY products.product_id;
    `;

  connection.query(query, (error, results) => {
    if (error) {
      callback(error);
      return;
    };
    //caso es exitosa
    callback(null, results);
    ;
  });
}

function getProduct(id, callback) {
  //prevent mysql injection with mysql.escape() method
  let query =
    `
    SELECT 

    products.product_id, products.name,
    products.price,

    GROUP_CONCAT(imageUrls.imageUrl) as imageUrls,
    GROUP_CONCAT(materials.material) as materials,
    GROUP_CONCAT(materials.color) as colors,
    GROUP_CONCAT(sizes.size) as sizes

    FROM products

    INNER JOIN
    imageUrls
    ON
    products.product_id = imageUrls.product_id


    INNER JOIN
    materials
    ON
    products.product_id = materials.product_id

    INNER JOIN
    sizes
    ON
    products.product_id = sizes.product_id
    
    WHERE products.product_id = ${mysql.escape(id)}

    GROUP BY products.product_id
    
    ;
    
    `

  connection.query(query, (error, results) => {
    if (error) {
      callback(error);
      return;
    };
    //caso es exitosa
    callback(null, results);
    ;
  });
}

exports.getProducts = getProducts;
exports.getProduct = getProduct;


const queryToInsertInDifferentTables = `
BEGIN;

INSERT INTO products (name, price)
  VALUES('Cadena', 10000);

INSERT INTO imageUrls (product_id, imageUrl) 
  VALUES(LAST_INSERT_ID(), 'https://http2.mlstatic.com/D_NQ_NP_806753-MLM32715145605_102019-O.webp');

INSERT INTO materials (product_id, material, color) 
  VALUES(LAST_INSERT_ID(), 'plata', 'blanco');

INSERT INTO sizes (product_id, size) 
  VALUES(LAST_INSERT_ID(), 'grande');






  INSERT INTO products (name, price)
  VALUES('Aretes', 15000);

INSERT INTO imageUrls (product_id, imageUrl) 
  VALUES(LAST_INSERT_ID(), 'https://willyjhons.co/wp-content/uploads/2020/03/PAT1060017.jpg');

INSERT INTO materials (product_id, material, color) 
  VALUES(LAST_INSERT_ID(), 'plata', 'brillante');

INSERT INTO sizes (product_id, size) 
  VALUES(LAST_INSERT_ID(), 'grande');







  INSERT INTO products (name, price)
  VALUES('Diadema', 25000);

INSERT INTO imageUrls (product_id, imageUrl) 
  VALUES(LAST_INSERT_ID(), 'https://thumbs.dreamstime.com/b/diadema-simple-de-la-tiara-del-diamante-oro-ejemplo-d-117708505.jpg');

INSERT INTO materials (product_id, material, color) 
  VALUES(LAST_INSERT_ID(), 'Oro', 'brillante');

INSERT INTO sizes (product_id, size) 
  VALUES(LAST_INSERT_ID(), 'mediano');



  INSERT INTO products (name, price)
  VALUES('Brasalete', 35000);

INSERT INTO imageUrls (product_id, imageUrl) 
  VALUES(LAST_INSERT_ID(), 'https://m.media-amazon.com/images/I/51cptia5LHL._AC_UY395_.jpg');

INSERT INTO materials (product_id, material, color) 
  VALUES(LAST_INSERT_ID(), 'Oro', 'brillante');

INSERT INTO sizes (product_id, size) 
  VALUES(LAST_INSERT_ID(), 'grande');


COMMIT;
`
