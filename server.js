const express = require("express");
const cors = require("cors")
const conexao = require("./db.js");
const { READONLY } = require("sqlite3");

const PORTA = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {


    res.status(200).json({ msg: "API Sistema de musicas funcionando" })
});
app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas";

    conexao.query(sql, (erro, resultado) => { //query primeiro , caso de erro e o 2 mandado, caso de certo 3 mandado
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            })
        }
        res.status(200).json(resultado)
    })
})
app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM artistas WHERE id = ?`;

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            })
        }
        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Artista n encontrado"
            })
        }
        res.status(200).json(resultado[0])
    })

})

app.post("/artistas", (req, res) => {
    const { nome, genero, pais } = req.body;
    const sql = `INSERT INTO artistas (nome, genero, pais) VALUES(?, ?, ?)`;

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            })
        }
        res.status(201).json({
            msg : "Artista Cadastradl com Sucesso",
            id: resultado.insertId
        })

        res.status(200).json(resultado[0])
    })
})

app.delete("/artistas/:id",(req,res)=>{

})

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http//localhost>${PORTA}`);
})