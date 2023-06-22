const { Router } = require('express');
const {getDogsHandler, getDogByIdHandler, getDogByNameHandler, 
postDogsHandler, deleteDogHandler} = require('../handlers/index')
const dogRouter = Router();

dogRouter.get('/', getDogsHandler);
dogRouter.get('/name', getDogByNameHandler);
dogRouter.get('/:id', getDogByIdHandler);
dogRouter.post('/', postDogsHandler);
dogRouter.delete('/:id', deleteDogHandler);

module.exports = dogRouter;