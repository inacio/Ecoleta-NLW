import Knex from "knex";

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Lampadas', image: 'lampadas.svg' },
        {title: 'Pilhas e baterias', image: 'baterias.svg' },
        {title: 'Papeis e Papelão', image: 'papeis-papelao.svg' },
        {title: 'Eletronicos', image: 'eletronicos.svg' },
        {title: 'Resíduos orgânicos', image: 'organicos.svg' },
        {title: 'Óleo de Cozinha', image: 'oleo.svg' }
    ])
}