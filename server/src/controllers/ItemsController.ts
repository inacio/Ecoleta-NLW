import {Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController{

    async index(request: Request,response: Response) {
        let items = await knex('items').select('*');

        items = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })

        return response.json(items);
    }
}

export default ItemsController;