import express from 'express';
import { openDb } from './configDB.js';
import { criarTabelaCampeao } from './Controllers/Campeao.js';
import { criarTabelaItem } from './Controllers/Item.js';
import router from './routes.js';

//Passando express ao app e fazendo ele utilizar o router
const app = express();
const port = 3000;
app.use(express.json());
app.use(router);

//Criando arquivo SQLite (a conexão com o arquivo é feito via extenção SQLite)
openDb();

//Criando as duas tabelas para armazenar os dados
criarTabelaCampeao();
criarTabelaItem();


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});