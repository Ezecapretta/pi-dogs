import CardsContainer from "../CardsContainer/CardsContainer";
import {useEffect} from 'react'
import { useDispatch} from "react-redux";
import { getDogs, getTemperaments } from "../../redux/action";
import style from './HomePage.module.css'
const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, []) 
    return(
        <div>
            <CardsContainer/>
        </div>
    )
};

export default Home