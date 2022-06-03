const express = require('express');
const path = require('path');

const app = express();

const database = require('./database');

//servir automáticamente todos los archivos dentro de esta carpeta
app.use(express.static(__dirname + '/dist/orquidea-accesorios'));


app.get(
    '/',
    (req, res) => {
        res.sendFile(
            path.join(__dirname + '/dist/orquidea-accesorios/index.html'
            ));
    }
);

app.get(
    '/productsserver',
    (req, res) => {
        database.getProducts((error, results) => {
            if (error) {
                console.log('productos error? ' + error);
                res.send({ error: error.message });
                return;
            }
            console.log('productos? ' + JSON.stringify(results));
            const compatible_with_FRONTEND_results = results
                .map(
                    product => {
                        return {
                            id: product.product_id,
                            name: product.name,
                            imageUrls: product.imageUrls.split(","),
                            price: product.price,
                            materials: [
                                { name: 'lime', color: '#00CACA' },
                                { name: 'lettuce', color: '#80DC0B' },
                                { name: 'cherry', color: '#E91E63' },
                            ],
                            sizes: ["small", "medium"],
                        }
                    })
            res.send(compatible_with_FRONTEND_results);
        });
    }
);

app.get(
    '/productsserver/:id',
    (req, res) => {
        console.log('id ' + req.params.id),
            database.getProduct(req.params.id, (error, results) => {
                if (error) {
                    console.log('productos error? ', error);
                    res.send({ error: error.message });
                    return;
                }
                console.log('producto ------? ' + JSON.stringify(results));
                const compatible_with_FRONTEND_results = results
                    .map(
                        product => {
                            return {
                                id: product.product_id,
                                name: product.name,
                                imageUrls: product.imageUrls.split(","),
                                price: product.price,
                                materials: [
                                    { name: 'lime', color: '#00CACA' },
                                    { name: 'lettuce', color: '#80DC0B' },
                                    { name: 'cherry', color: '#E91E63' },
                                ],
                                sizes: ["small", "medium"],
                            }
                        })
                res.send(compatible_with_FRONTEND_results[0]);
            });
    }
);

app.get(
    '*',
    (req, res) => {
        res.redirect("/");
    }
);


/* LAST VERSION
app.get(
    '/*',
    function (req, res) {
        res.sendFile(path.join(__dirname + '/dist/orquidea-accesorios/index.html'));
    }
);
*/

app.listen(process.env.PORT || 8080, () => {
    console.log(`listening on port ${process.env.PORT || 8080}`)
});
