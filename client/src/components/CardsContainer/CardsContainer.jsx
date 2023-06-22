import React, { useState, useEffect } from 'react';
import Card from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination';
import {  useDispatch, useSelector} from 'react-redux'
import { setFilter, setSort, searchDogsByName } from '../../redux/action';
import style from './CardsContainer.module.css'

const CardsContainer = () => {
	const dogs = useSelector(state=>state.allDogs) 
    const temperaments = useSelector(state => state.temperaments);
    const filter = useSelector(state => state.filter);
    const sort = useSelector(state => state.sort);
    const dogResults = useSelector(state => state.searchResults);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [dogFounded, setDogFounded] = useState([]);
    useEffect(()=> {
        setDogFounded([...dogResults])
    }, [dogResults])
    const itemsPerPage = 8;
    const goToPage = (page) => {
        setCurrentPage(page);
    };
    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };

    const handleSortChange = (event) => {
        dispatch(setSort(event.target.value));
    };
    const searchDog = (name) => {
        dispatch(searchDogsByName(name));
        setDogFounded([...dogResults])
    }
    let filteredDogs = dogs;
    if (filter !== 'all') {
        filteredDogs = dogs.filter((dog) =>  dog.temperament && dog.temperament.includes(filter));
    }
    let sortedDogs = filteredDogs;
    if (sort === 'nameAsc') {
        sortedDogs = filteredDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nameDesc') {
        sortedDogs = filteredDogs.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'weightAsc') {
        sortedDogs = filteredDogs.sort((a, b) => {
            const weightA = parseInt(a.weight.metric.split(' - ')[0]);
            const weightB = parseInt(b.weight.metric.split(' - ')[0]);
            return weightA - weightB;
        });
    } else if (sort === 'weightDesc') {
        sortedDogs = filteredDogs.sort((a, b) => {
            const weightA = parseInt(a.weight.metric.split(' - ')[0]);
            const weightB = parseInt(b.weight.metric.split(' - ')[0]);
            return weightB - weightA;
        });
    }                                             
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedDogs.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className={style.container}>
            <div className={style.searchBarContainer}>
                <div className={style.filterSortContainer}>
                    <label className={style.filterLabel} htmlFor="filter">Filter by temperament:</label>
                    <select className={style.filterSelect} id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="all" className={style.option}>All</option>
                        {temperaments.map((temperament) => {
                            return <option value={temperament.name} key={temperament.id} className={style.option}>{temperament.name}</option>
                        })}
                    </select>
                </div>
                <SearchBar searchDog={searchDog}/>    
                <div className={style.filterSortContainer}>
                    <label className={style.sortLabel} htmlFor="sort">Order by:</label>
                    <select className={style.sortSelect} id="sort" value={sort} onChange={handleSortChange}>
                        <option value="none" className={style.option}>None</option>
                        <option value="nameAsc" className={style.option}>A - Z</option>
                        <option value="nameDesc" className={style.option}>Z - A</option>
                        <option value="weightAsc" className={style.option}>Weigth ascendent</option>
                        <option value="weightDesc" className={style.option}>Weigth descendent</option>
                    </select>
                </div>
            </div>
            <div className={style.cardsContainer}>
                {dogFounded.length === 0 ? (
                    currentItems.map((dog, index) => (
                        <Card
                        key={index}
                        id={dog.id}
                        name={dog.name}
                        image={dog.image?.url}
                        temperaments={dog.temperament}
                        />
                    ))
                ) : (
                    dogFounded.map((dog) => {
                        const dogImage = dogs.find(dog => dog.id === parseInt(dogFounded[0].id))
                        return (<Card
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            image={dogImage.image.url}
                            temperaments={dog.temperament}
                            />)
                        })
                        )}
            </div>
                        <Pagination
                            handleChange={goToPage}
                            totalItems={dogs.length}
                            currentPage={currentPage}
                            countPerPage={itemsPerPage}
                        />
            </div>
    );
};
export default CardsContainer