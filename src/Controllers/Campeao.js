import { openDb } from "../configDB.js";

//Função de criação da tabela
export async function criarTabelaCampeao() {
    openDb().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS Campeao (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, funcao TEXT, idade INTEGER)')
    })
};

//Funções de CRUD
export async function selectCampeoes(req, res) {
    openDb().then((db) => {
        db.all('SELECT * FROM Campeao')
        //O resultado do select vai cair em campeões, e será retornado via função res.json()
        .then((campeoes) => res.json(campeoes))
    })
}

export async function selectCampeao(req, res) {
    let campeao = req.body
    openDb().then((db) => {
        db.get('SELECT * FROM Campeao WHERE id=?', [campeao.id])
        .then(campeoes => res.json(campeoes))
    })
}

export async function insertCampeao(req, res) {
    let campeao = req.body;
    openDb().then((db) => {
        db.run('INSERT INTO Campeao (nome, funcao, idade) VALUES (?, ?, ?)', [campeao.nome, campeao.funcao, campeao.idade]);
    })
    //Usamos o res.json quando queremos devolver um JSON após a requisição
    res.json({
        "statusCode": 200,
        "msg": "Campeao inserido com sucesso"
    })
}

export async function updateCampeao(req, res) {
    let campeao = req.body;
    if (!req.body.id) {
        res.json({
            "statusCode": 400,
            "msg": "Insira um id válido"
        }) 
    } else {
        openDb().then((db) => {
            db.run('UPDATE Campeao SET nome=?, funcao=?, idade=? WHERE id=?', [campeao.nome, campeao.funcao, campeao.idade, campeao.id])
        })
        res.json({
            "statusCode": 200,
            "msg": "Campeão alterado com sucesso!"
        })
    }
}

export async function deleteCampeao(req, res) {
    let campeao = req.body;
    openDb().then((db) => {
        db.run('DELETE FROM Campeao WHERE id=?', [campeao.id]);
    })
    res.json({
        "statusCode": 200,
        "msg": "Campeao deletado com sucesso."
    })
}
