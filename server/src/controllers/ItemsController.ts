import {Request, Response } from 'express';
import knex from '../database/connection';
import IP from 'ip';

class ItemsController{

    async index(request: Request,response: Response) {
        let items = await knex('items').select('*');
        let ip = (IP.address('Ethernet')) ? IP.address('Ethernet') : IP.address();

        items = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://${ip}:3333/uploads/${item.image}`
            }
        })

        return response.json(items);
    }
}

export default ItemsController;