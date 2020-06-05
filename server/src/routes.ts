import express from 'express';
import knex from './database/connection';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';


const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (request,response) => {
    return response.json({name: 'inicio'});
});

/**
 * Items
 */
    //READ
    routes.get('/items', itemsController.index);
    
/**
 * Points
 */
    //READ
    routes.get('/points', pointsController.index);
    //show
    routes.get('/point/:id', pointsController.show);
    //CREATE
    routes.post('/points', pointsController.create);  
/**
 * Points imtes
 */
    //READ
    routes.get('/point_items', async (request,response) => {
        const point_items = await knex('point_items').select('*');

        return response.json(point_items);
    });

export default routes;