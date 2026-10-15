const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const PORTA = 3000;

const app = express();

app.use(cors());
app.use(express.json());

// ----------------------
// ROTA INICIAL
// ----------------------

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "API Sistema de musicas funcionando"
    });
});


app.get("/artistas", (req, res) => {
    const sql = "SELECT * FROM artistas";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar artistas"
            });
        }

        res.status(200).json(resultado);
    });
});

app.get("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID de artista invalido"
        });
    }

    const sql = "SELECT * FROM artistas WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar artista"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Artista nao encontrado"
            });
        }

        res.status(200).json(resultado[0]);
    });
});

// Listar albuns
app.get("/albuns", (req, res) => {
    const sql = "SELECT * FROM albuns";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar albuns"
            });
        }

        res.status(200).json(resultado);
    });
});


app.get("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID de album invalido"
        });
    }

    const sql = "SELECT * FROM albuns WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar album"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Album nao encontrado"
            });
        }

        res.status(200).json(resultado[0]);
    });
});


app.get("/musicas", (req, res) => {
    const sql = "SELECT * FROM musicas";

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar musicas"
            });
        }

        res.status(200).json(resultado);
    });
});


app.get("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID de musica invalido"
        });
    }

    const sql = "SELECT * FROM musicas WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar musica"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Musica nao encontrada"
            });
        }

        res.status(200).json(resultado[0]);
    });
});


app.post("/artistas", (req, res) => {
    const { nome, genero, pais } = req.body;

    if (!nome || !genero || !pais) {
        return res.status(400).json({
            msg: "Falta nome, genero ou pais"
        });
    }

    const sql = `
        INSERT INTO artistas (nome, genero, pais)
        VALUES (?, ?, ?)
    `;

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao cadastrar artista"
            });
        }

        res.status(201).json({
            msg: "Artista cadastrado com sucesso",
            id: resultado.insertId
        });
    });
});


app.post("/albuns", (req, res) => {
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!titulo || ano_lancamento == null || !artista_id) {
        return res.status(400).json({
            msg: "Falta titulo, ano_lancamento ou artista_id"
        });
    }

    const sql = `
        INSERT INTO albuns (titulo, ano_lancamento, artista_id)
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [titulo, ano_lancamento, artista_id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao cadastrar album"
                });
            }

            res.status(201).json({
                msg: "Album cadastrado com sucesso",
                id: resultado.insertId
            });
        }
    );
});

app.post("/musicas", (req, res) => {
    const { titulo, duracao, album_id } = req.body;

    if (!titulo || duracao == null || !album_id) {
        return res.status(400).json({
            msg: "Falta titulo, duracao ou album_id"
        });
    }

    const sql = `
        INSERT INTO musicas (titulo, duracao, album_id)
        VALUES (?, ?, ?)
    `;

    conexao.query(sql, [titulo, duracao, album_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao cadastrar musica"
            });
        }

        res.status(201).json({
            msg: "Musica cadastrada com sucesso",
            id: resultado.insertId
        });
    });
});

app.delete("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de artista invalido"
        });
    }

    const sql = "DELETE FROM artistas WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                msg: "Erro ao excluir artista"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                msg: "Artista nao encontrado"
            });
        }

        res.status(200).json({
            msg: "Artista excluido com sucesso"
        });
    });
});

// Excluir album
app.delete("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de album invalido"
        });
    }

    const sql = "DELETE FROM albuns WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                msg: "Erro ao excluir album"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                msg: "Album nao encontrado"
            });
        }

        res.status(200).json({
            msg: "Album excluido com sucesso"
        });
    });
});

// Excluir musica
app.delete("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de musica invalido"
        });
    }

    const sql = "DELETE FROM musicas WHERE id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                msg: "Erro ao excluir musica"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                msg: "Musica nao encontrada"
            });
        }

        res.status(200).json({
            msg: "Musica excluida com sucesso"
        });
    });
});


app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, genero, pais } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de artista invalido"
        });
    }

    if (!nome || !genero || !pais) {
        return res.status(400).json({
            msg: "Falta nome, genero ou pais"
        });
    }

    const sql = `
        UPDATE artistas
        SET nome = ?, genero = ?, pais = ?
        WHERE id = ?
    `;

    conexao.query(sql, [nome, genero, pais, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao atualizar artista"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                msg: "Artista nao encontrado ou sem alteracoes"
            });
        }

        res.status(200).json({
            msg: "Artista atualizado com sucesso"
        });
    });
});

// Atualizar album
app.put("/albuns/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, ano_lancamento, artista_id } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de album invalido"
        });
    }

    if (!titulo || ano_lancamento == null || !artista_id) {
        return res.status(400).json({
            msg: "Falta titulo, ano_lancamento ou artista_id"
        });
    }

    const sql = `
        UPDATE albuns
        SET titulo = ?, ano_lancamento = ?, artista_id = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [titulo, ano_lancamento, artista_id, id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao atualizar album"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Album nao encontrado ou sem alteracoes"
                });
            }

            res.status(200).json({
                msg: "Album atualizado com sucesso"
            });
        }
    );
});

// Atualizar musica
app.put("/musicas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, duracao, album_id } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de musica invalido"
        });
    }

    if (!titulo || duracao == null || !album_id) {
        return res.status(400).json({
            msg: "Falta titulo, duracao ou album_id"
        });
    }

    const sql = `
        UPDATE musicas
        SET titulo = ?, duracao = ?, album_id = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [titulo, duracao, album_id, id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao atualizar musica"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    msg: "Musica nao encontrada ou sem alteracoes"
                });
            }

            res.status(200).json({
                msg: "Musica atualizada com sucesso"
            });
        }
    );
});


app.join("/artistas/:id/albuns",(req,res)=> {

    
    const id = Number(req.params.id)
    const sql = `
    SELECT artistas.nome, musicas.titulo FROM artistas JOIN albuns
    ON artistas.id = albuns.artista_id JOIN musicas
    ON musicas.album_id = albuns.id
    WHERE artista_id = ?
    ORDER BY artistas.nome`
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            msg: "ID de artista invalido"
        });
    }
    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
             return res.status(500).json({
                msg: "erro no servidor"
             })
        }
        })
})

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
