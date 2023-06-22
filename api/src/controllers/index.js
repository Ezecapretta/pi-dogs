const {Dog, Temperament} = require('../db')
const URL = 'https://api.thedogapi.com/v1/breeds'
const axios = require('axios');
const {API_KEY} = process.env

const cleanArray = (arr) => 
    arr.map((elem => {
        return {
            id: elem.id,
            name: elem.name,
            image: elem.image,
            height: elem.height,
            weight: elem.weight,
            lifeSpan: elem.life_span,
            temperament: elem.temperament,
            created: false,
        }
}))

const getDogs = async () => {
    const apiResponse = (await axios.get(`${URL}?api_key=${API_KEY}`)).data;
    const apiDogs = cleanArray(apiResponse)
    const bddDogs = await Dog.findAll()
    const finalArr = bddDogs.concat(apiDogs);
    return finalArr
}

const getDogByID = async (id, source) => {
    if (source === 'api') {
        const apiResponse = await axios.get(`${URL}/${id}?api_key=${API_KEY}`)
        const {name, reference_image_id , height, temperament, weight, life_span, origin} = apiResponse.data;
        let apiDog = {
            id: id,
            name: name,
            height: height.metric,
            weight: weight.metric,
            life_span: life_span,
            image: reference_image_id,
            temperament: temperament,
            origin: origin,
        }
        return apiDog
    } else {
        const bddResponse = await Dog.findOne({
            where: { id },
            include: {
                model: Temperament,
                attributes: ["temperament"],
                through: {
                    attributes: []
                }
            }
        })
        return bddResponse
    }
}

const getDogByName = async (name) => {
    const bddDog = await Dog.findAll({where: {name: name}})
    const apiResponse = (await axios.get(`${URL}/search?q=${name}`)).data;
    apiDog = cleanArray(apiResponse)
    filterDog = apiDog.filter((user)=> user.name.toLowerCase() == name.toLowerCase())
    return [...bddDog, ...filterDog];
}

const postDog = async (name, height, weight, lifeSpan, temperaments) => {
    const dog = await Dog.create({
        name,
        height, 
        weight, 
        lifeSpan, 
    })
    let associatedTemps = await Temperament.findAll({where: {name: temperaments}})
    await dog.addTemperament(associatedTemps)
    return dog
}

const getTemperaments = async () => {
    const response = await axios.get(`${URL}?api_key=${API_KEY}`);
    const apiTemperaments = response.data;
    for(const element of apiTemperaments ){
        if(element.temperament){
            const clean = element.temperament.split(',')
            for(const item of clean){
                await Temperament.findOrCreate({
                    where:{
                        name: item.trim(),
                    },
                })
            }
        }
    }
    const bddTemperaments = Temperament.findAll()
    return bddTemperaments
}
const getDogDeleted = async (id) => {
    const dogFind = await Dog.destroy({where: {id}})
    const response = await getDogs()
    return [...response ,{dogFind}]
}

module.exports = {postDog, getDogByID, getDogByName, getDogs, getTemperaments, getDogDeleted};