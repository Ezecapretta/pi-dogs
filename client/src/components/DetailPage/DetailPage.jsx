import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDogById } from "../../redux/action"
import { useParams } from 'react-router-dom'
import style from './DetailPage.module.css'

const Detail = () => {
    const {id} = useParams()
    const {name, height, weight, temperament, life_span, origin} = useSelector((state) => state.dogDetail)
    const dogs = useSelector((state)=> state.allDogs)
    const dog = dogs.find(dog => dog.id === parseInt(id));
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDogById(id))
    }, [dispatch, id])
    const formattedHeight = `Height: ${height} cm`;
    const formattedWeight = `Weight: ${weight} kg`
    return(
        <div className={style.detailContainer}>
            <div className={style.container}>
                <div>
                    <img src={dog.image.url} alt="dog" className={style.img}/>
                </div>
                <div className={style.text}>
                    <h3>Breed: {name}</h3>
                    <h3>{formattedHeight}</h3>
                    <h3>{formattedWeight}</h3>
                    <h3>Life Span: {life_span}</h3>
                    <h3>Origin: {origin}</h3>
                </div>
            </div>
            <div className={style.temperament}>
                <h3 className={style.text}>Temperaments</h3>
                {temperament?.split(',').map((elem, index) =>{
                    return <h4 key={index} className={style.elements}>{elem}</h4>
                    })}
            </div>
        </div>
    )
};

export default Detail