const { createPool } = require('mysql');
const app = require('../../config/server')
const pool = require('../../config/db')

module.exports = app => {
    app.get('/', (req, res) => {
        pool.query('SELECT * FROM users', (err, result) => {
            console.log(result);
            res.render("../views/index.ejs", {
                inventario: result

            })
        })
    })
    app.get('/login', (req, res) => {
        res.render('../views/login.ejs')
    })
    app.get('/registro', (req, res) => {
        res.render('../views/registro.ejs')
    })
    app.get('/index', (req, res) => {
        res.render('db/registro')
    })

    app.post('/registro', async(req, res) => {
        const { nombre, apellido, correo, telefono, pass, subject} = req.body

        console.log(req.body);

        const newUser = {
            nombre,
            apellido,
            correo,
            telefono,
            pass,
            subject
        
        }

        await pool.query('INSERT INTO usuarios2 set ?', [newUser])

        res.send('recibido')
    })

    app.post('/login', (req,res) => {
        const {email,password} = req.body
        if(email && password){
            pool.query('SELECT * FROM usuarios2 WHERE correo = ?', [email], async (error,result) => {
                if(result.length === 0 || !(password === result[0].pass)){
                    res.render("../views/login.ejs")
                }else{
                    req.session.loggedin=true; 
                    req.session.name=result[0].nombre 
                    res.render("../views/index.ejs")
                }
            })

        }
    })
}