const express = require("express");
const router = express.Router();

const mysqlConnection = require("./acess_mysql");

router.get("/api/selectcountry", (req, res) => {
    mysqlConnection.query("SELECT * FROM paises ;", (err, rows, fields) => {
        if (!err) {
            res.json(rows);

        } else {
            console.log('Erro');
        }
    });
});

router.get("/api/selectcountrystate/:country", (req, res) => {
    const { country } = req.params;
    mysqlConnection.query("SELECT * FROM estados where paise_id= ?;", [country], (err, rows, fields) => {
        if (!err) {
            res.json(rows);

        } else {
            console.log('Erro');
        }
    });
});

router.get("/api/selectcountrystatecity/:country/:state", (req, res) => {
    var { country, state } = req.params;
    var nstate = ''

    if (state !== '0' || state !== 'null') {
        nstate = ' and estado_id = ' + state
    }

    var query01 = "SELECT * FROM cidades where paise_id=" + country + ' ' + nstate + " ;"
    console.log(query01)
    mysqlConnection.query(query01, (err, rows, fields) => {
        if (!err) {
            res.json(rows);

        } else {
            console.log('Erro');
        }
    });
});


router.get("/api/list", (req, res) => {
    mysqlConnection.query("SELECT p.*, date_format(p.data_nasc, '%d/%m/%Y') as data FROM pessoa p ;", (err, rows, fields) => {
        if (!err) {
            res.json(rows);

        } else {
            console.log('Erro');
        }
    });
});


router.post("/api/post", (req, res) => {
    const { nome, cpf, datanasc, pais, cidade, estado, cep, endereco, numero, complemento } = req.body

    const query = "CALL p_insertPessoa(0,?,?,?,?,?,?,?,?,?,?);";
    mysqlConnection.query(query, [nome, cpf, datanasc, pais, cidade, estado, cep, endereco, numero, complemento], (err, rows, fields) => {
        if (!err) {
            res.json({ status: "Salvo!" });
        } else {
            console.log(err);
        }
    });
});




router.get("/api/getlist/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
        "SELECT * FROM pessoa p, endereco e where p.endereco = id_end and pessoa_id = ? ",
        [id],
        (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log('Erro');
            }
        }
    );
});

router.get("/api/getcpf/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
        "SELECT p.*, date_format(p.data_nasc, '%d/%m/%Y') as data FROM pessoa p, endereco e where p.endereco = id_end and cpf = ? ",
        [id],
        (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log('Erro');
            }
        }
    );
});


router.put("/api/putList/:id", (req, res) => {
    const { id } = req.params;
    const { nome, cpf, datanasc, pais, cidade, estado, cep, endereco, numero, complemento } = req.body

    const query = "CALL p_insertPessoa(?,?,?,?,?,?,?,?,?,?,?);";
    mysqlConnection.query(query, [id, nome, cpf, datanasc, pais, cidade, estado, cep, endereco, numero, complemento], (err, rows, fields) => {
        if (!err) {
            res.json({ status: "Alterado!" });
        } else {
            console.log(err);
        }
    });
});


router.delete("/api/deleteItem/:id", (req, res) => {
    const { id } = req.params;

    const query = "CALL p_deletePessoa(?);";
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: "Deleted" });
        } else {
            console.log(err);
        }
    }
    ); 
});


module.exports = router; 