const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')
const bcrypt = require('bcrypt-nodejs')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'TP5'
})

client.connect()

class Panier {
    constructor() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.articles = []
    }
}

router.use((req, res, next) => {
    // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
    if (typeof req.session.panier === 'undefined') {
        req.session.panier = new Panier()
    }
    next()
})

router.get('/panier', (req, res) => {
    // res.status(501).json({ message: 'Not implemented' })
    res.json(req.session.panier)
})

router.post('/panier', (req, res) => {
    const id = req.body.id
    const quantity = req.body.quantity

    req.session.panier.articles.forEach(art => {
        if (art.id == id)
            res.status(400).json({ message: 'bad request' })
    });

    const article = {
        id: id,
        quantity: quantity,
    }

    req.session.panier.articles.push(article)
    res.json(article)
})


router.post('/panier/pay', (req, res) => {
    console.log(req.session.userId)
    if (!req.session.userId) {
        res.json({
            accepted: false,
            message: "payement refues please login ❌"
        })
    } else {
        res.json({
            accepted: true,
            message: "thanks for your purchase ✅"
        })
    }
})

router.put('/panier/:articleId', (req, res) => {
    const id = req.params.articleId
    const quantity = req.body.quantity

    let valid = false
    req.session.panier.articles.forEach(art => {
        if (art.id == id)
            valid = true
    });
    if (quantity <= 0)
        valid = false

    if (!valid)
        res.status(400).json({ message: 'BadRequest' })
    else {
        req.session.panier.articles.forEach((art, i) => {
            if (art.id == id)
                req.session.panier.articles[i].quantity = quantity
        });
    }

    res.send()
})


router.delete('/panier/:articleId', (req, res) => {
    const id = req.params.articleId

    let valid = false
    req.session.panier.articles.forEach(art => {
        if (art.id == id)
            valid = true
    });

    if (!valid)
        res.status(400).json({ message: 'BadRequest' })
    else {
        const ind = req.session.panier.articles.findIndex(a => a.id === id)
        req.session.panier.articles.splice(ind, 1)

        res.send()
    }

})

router.get('/articles', (req, res) => {
    client.query(
        'SELECT * FROM articles', null, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json(results.rows)

            }
        })
})

router.post('/article', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    // vérification de la validité des données d'entrée
    if (typeof name !== 'string' || name === '' ||
        typeof description !== 'string' || description === '' ||
        typeof image !== 'string' || image === '' ||
        isNaN(price) || price <= 0) {
        res.status(400).json({ message: 'bad request' })
        return
    }

    const article = {
        name: name,
        description: description,
        image: image,
        price: price
    }
    client.query(
        `INSERT INTO articles (name, description, image, price) VALUES ($1, $2, $3, $4)`,
        [article.name, article.description, article.image, article.price]
    )
    res.json(article)
})


function parseArticle(req, res, next) {
    const articleId = parseInt(req.params.articleId)

    // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
    if (isNaN(articleId)) {
        res.status(400).json({ message: 'articleId should be a number' })
        return
    }
    // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
    req.articleId = articleId

    const article = articles.find(a => a.id === req.articleId)
    if (!article) {
        res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
        return
    }
    // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
    req.article = article
    next()
}

router.route('/article/:articleId')
    /**
     * Cette route envoie un article particulier
     */
    .get(parseArticle, (req, res) => {
        client.query(
            `SELECT * FROM articles WHERE id=$1`,
            [req.articleId],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(404).json({
                        message: `cant get article ${req.articleId} ❌`
                    })
                }
                else if (result) {
                    res.json(result.rows)
                    console.log(result)
                }
            }
        )
    })

    .put(parseArticle, (req, res) => {
        const name = req.body.name
        const description = req.body.description
        const image = req.body.image
        const price = parseInt(req.body.price)

        client.query(
            `UPDATE articles SET name=$1, description=$2, image=$3, price=$4 WHERE id=$5`,
            [name, description, image, price, req.articleId],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.json({
                        message: `articles ${req.articleId} failed update ❌`
                    })
                }
                else if (result) {
                    res.json({
                        message: `articles ${req.articleId} updated ✅`
                    })
                    console.log(result)
                }
            }
        )

    })

    .delete(parseArticle, (req, res) => {
        client.query(
            `DELETE FROM articles WHERE id=$1`,
            [req.articleId],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.json({
                        message: `articles ${req.articleId} failed delete ❌`
                    })
                }
                else if (result) {
                    res.json({
                        message: `articles ${req.articleId} deleted ✅`
                    })
                    console.log(result)
                }
            }
        )
    })


router.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    client.query(
        'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
            if (err) {
                console.log(err)
            } else {

                if (results.rows.length > 0) {
                    console.log('user ' + email + ' exists')
                    res.json({
                        registered: false,
                        message: 'user already exists'
                    })
                }

                else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt);
                    client.query(
                        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
                        [email, hash],
                        (err, results) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(results.rows)
                                res.json({
                                    registered: true,
                                    message: 'user registered ✅'
                                })
                            }
                        }
                    )
                }
            }
        }
    )
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let exists = false

    client.query(
        'SELECT * FROM users WHERE email=$1', [email], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                if (results.rows.length > 0) {

                    bcrypt.compare(password, results.rows[0].password, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        if (result) {
                            req.session.userId = results.rows[0].id
                            res.json({ logedIn: true, message: 'loged in ✅' });

                        } else {
                            res.json({ logedIn: false, message: 'passwords do not match ❌' });
                        }
                    });

                } else {
                    res.json({
                        logedIn: false,
                        message: "user does not exist ❌"
                    })
                }
            }
        }
    )

})

router.get('/me', (req, res) => {
    if (!req.session.userId) {
        res.status(401).json({ message: 'no one connected ❌' })
    } else {
        res.json({
            id: req.session.userId
        })
    }

})

//Routine de remplissage de la base de donnée avec les articles
//Si la base de donnée est vide alors les articles sont pushés dans la bdd
client.query(
    'SELECT * FROM articles', null, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            if (results.rows.length == 0) {
                articles.forEach(article => {
                    client.query(
                        `INSERT INTO articles (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *`,
                        [article.name, article.description, article.image, article.price]),
                        (err, res) => {
                            if (err)
                                console.log(err)
                            else
                                console.log(res)
                        }

                });
            }
        }
    })

module.exports = router
