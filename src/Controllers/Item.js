import { openDb } from "../configDB.js";

export async function criarTabelaItem () {
    openDb().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS Item(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, preco FLOAT)')
    })
}

export async function selectItems(req, res) {
    openDb().then((db) => {
        db.all('SELECT * FROM Item')
        //O resultado do select vai cair em items, e será retornado via função res.json()
        .then((items) => res.json(items))
    })
}

export async function selectItem(req, res) {
    let item = req.body
    openDb().then((db) => {
        db.get('SELECT * FROM Item WHERE id=?', [item.id])
        .then((items) => res.json(items))
    })
}

export async function insertItem(req, res) {
    let item = req.body;
    openDb().then((db) => {
        db.run('INSERT INTO Item (nome, preco) VALUES (?, ?)', [item.nome, item.preco]);
    })
    //Usamos o res.json quando queremos devolver um JSON após a requisição
    res.json({
        "statusCode": 200,
        "msg": "Item inserido com sucesso"
    })
}

export async function updateItem(req, res) {
    let item = req.body;
    if (!req.body.id) {
        res.json({
            "statusCode": 400,
            "msg": "Insira um id válido"
        }) 
    } else {
        openDb().then((db) => {
            db.run('UPDATE Item SET nome = ?,preco = ? WHERE id = ? ', [item.nome, item.preco, item.id]);
        })
        res.json({
            "statusCode": 200,
            "msg": "Item alterado com sucesso!"
        })
    }

}

export async function deleteItem(req, res) {
    let item = req.body;
    openDb().then((db) => {
        db.run('DELETE FROM Item WHERE id=?', [item.id]);
    })
    res.json({
        "statusCode": 200,
        "msg": "Item deletado com sucesso!"
    })
}
