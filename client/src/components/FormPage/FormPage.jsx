import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../../redux/action'
import style from './FormPage.module.css';


const FormPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
    }, []) 
    const [errors, setErrors] = useState({})
    const [dog, setDog] = useState({
        name: "",
        height: "",
        weight: "",
        temperaments: [],
        lifeSpan: "",
    });
    const [submit, setSubmit] = useState({})
    const temperaments = useSelector(state => state.temperaments);
    const validate = (input) => {
        let errors = {}
        if (!input.name) {
            errors.name = "Name is required"
        }
        if (input.name.length < 3) {
            errors.name = "The name must have at least 3 letters"
        }
        if (input.temperaments.length === 0) {
            errors.temperaments = "Temperaments are required"
        }
    }
    const handleChange = (event) => {
        setSubmit({})
        setDog({
            ...dog,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...dog,
            [event.target.name]: event.target.value
        }))
    }
    const handleChangeTemperment = (event) => {
        if (!dog.temperaments.includes(event.target.value)) {
            setDog({...dog, temperaments: [...dog.temperaments, event.target.value]})
        }
        setErrors(
            validate({
                ...dog,
                [event.target.name]: event.target.value,
            })
        );
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit({
            ...submit,
            submit:"submit"})
            console.log(dog);
        dispatch(createDog(dog))
        setDog({
            name: "",
            height: "",
            weight: "",
            temperaments: [],
            lifeSpan: "",
        })
    }

    const handleDeleteTemperament = (tempe) => {
        const filterTemperaments = dog.temperaments.filter((temperament)=>temperament !== tempe)
        setDog({
            ...dog,
            temperaments:filterTemperaments
        })
    }
    return (
        <div className={style.formContainer}>
            <div className={style.title}>
                <h1>Create your breed</h1>
            </div>
            <div className={style.form}>
                <form>
                    <div className={style.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name='name'
                            value={dog.name}
                            onChange={handleChange}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="height">Height:</label>
                        <input
                            type="text"
                            name='height'
                            value={dog.height}
                            onChange={handleChange}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="weight">Weight:</label>
                        <input
                            type="text"
                            name='weight'
                            value={dog.weight}
                            onChange={handleChange}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input type="number" className={style.input} name="lifeSpan" value={dog.lifeSpan} placeholder="Type a life span..." onChange={handleChange} min="1"/>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="temperaments">Temperaments:</label>
                        <select id="temperaments" onChange={handleChangeTemperment} className={style.input}>
                            <option value="">All</option>
                            {temperaments?.map((temperament) => {
                                return <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={style.temperamentContainer}>
                        {dog.temperaments?.map((tempe, i) => (
                            <div key={i} className={style.temperament}>
                            <span className={style.spanText}>{tempe}</span>
                            <button
                                className={style.temperamentButton}
                                onClick={() => handleDeleteTemperament(tempe)}
                                type="button"
                            >
                            ❌
                            </button>
                            </div>
                        ))}
                    </div>
                    <div className={style.submitButton}>
                        <button  className={style.button} type="submit" onClick={handleSubmit}>Create breed</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPage;
