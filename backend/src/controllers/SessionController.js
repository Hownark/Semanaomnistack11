const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body; // id que foi passado

        const ong = await connection('ongs') // tabela ong
            .where('id', id)        // onde id passado seja = id da tab
            .select('name')  // selecionar o nome
            .first(); // devolver o primeiro resultado

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID'}); // se o id nao existir na tab
        }

        return response.json(ong); // retorna nome da ong 
    }
}