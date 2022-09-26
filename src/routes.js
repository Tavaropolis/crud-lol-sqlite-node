import { Router } from "express";
import { deleteCampeao, selectCampeao, selectCampeoes, insertCampeao, updateCampeao } from "./Controllers/Campeao.js";
import { deleteItem, selectItem, selectItems, insertItem, updateItem } from "./Controllers/Item.js";

const router = Router();


//Definindo as rotas da nossa aplicação
router.get('/', (req, res) => {
    res.json({
        "msg" : "API rodando!"
    })
});

router.get('/campeoes', selectCampeoes);
router.get('/campeao', selectCampeao);
router.post('/campeao', insertCampeao);
router.put('/campeao', updateCampeao);
router.delete('/campeao', deleteCampeao);

router.get('/items', selectItems);
router.get('/item', selectItem);
router.post('/item', insertItem);
router.put('/item', updateItem);
router.put('/item', deleteItem);

//Isso é muito importante, o router precisa ser exportado ao app
export default router;