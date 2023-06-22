const temperamentRouter = require('express').Router();
const {getTemperamentsHandler} = require('../handlers/index')

temperamentRouter.get('/', getTemperamentsHandler);

module.exports = temperamentRouter;