const {postDog, getDogByID, getDogs, getDogByName, getTemperaments, getDogDeleted} = require('../controllers/index')

const getDogsHandler = async (req, res) => {
    try {
        const dogs = await getDogs();
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las razas de perros de la API' });
    }
};

const getDogByIdHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? 'BDD' : 'api'
    try {
        const user = await getDogByID(id, source)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perro por ID' })
    }
}

const getDogByNameHandler = async (req, res) => {
    const {name} = req.query; 
    try {
        const dogs = await getDogByName(name);
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: `No hay perros de esa raza`})
    }
}

const postDogsHandler = async (req, res) => {
    try {
        const {name, height, weight, lifeSpan, temperaments} = req.body
        console.log('assa', req.body);
        if (!name || !height || !weight || !lifeSpan|| !temperaments) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const newDog = await postDog(name, height, weight, lifeSpan, temperaments)
        res.status(201).json(newDog)
    } catch (error) {
        res.status(500).json({ error: `no se puede crear el perro`})
    }
};

const getTemperamentsHandler = async (req, res) => {
        try {
            const temperaments = await getTemperaments()
            res.status(200).json(temperaments);
        } catch (error) {
            res.status(500).json({ error: `no se pueden obtener los temperamentos`})
        }
};

const deleteDogHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const dogDeleted = await getDogDeleted(id)
        res.status(200).json(dogDeleted)
    } catch (error) {
        res.status(500).json({ error: `no se puede borrar el perro`})
    }
};
module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    getDogByNameHandler,
    postDogsHandler,
    getTemperamentsHandler,
    deleteDogHandler,
};