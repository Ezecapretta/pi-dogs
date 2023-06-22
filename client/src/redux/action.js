import axios from 'axios'
import { GET_DOGS, GET_DOG_BY_ID, ERROR, SET_FILTER, SET_SORT, GET_TEMPERAMENTS, CREATE_DOG, SEARCH_DOGS_BY_NAME, SET_SEARCH_RESULTS } from './action-type'
const URL = 'http://localhost:3001'

export const getDogs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/dogs`)
            const dogs = response.data

            dispatch({
                type: GET_DOGS,
                payload: dogs
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}

export const getDogById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/dogs/${id}`)
            const dog = response.data
            dispatch({
                type: GET_DOG_BY_ID,
                payload: dog
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}
export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        payload: filter
    };
};

export const setSort = (sort) => {
    return {
        type: SET_SORT,
        payload: sort
    };
};
export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/temperaments`);
            const temperaments = response.data;
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments
            });
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            });
        }
    };
};
export const createDog = (dogData) => {
    return async (dispatch) => {
        try {
            const dogCreated = await axios.post(`${URL}/dogs`, dogData);
            dispatch({ type: CREATE_DOG, payload: dogCreated });
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            });
        }
    };
};
export const searchDogsByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/dogs/name?name=${name}`);
            const results = response.data;
            dispatch({
                type: SEARCH_DOGS_BY_NAME,
                payload: results,
            });
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error,
            });
        }
    };
};
export const setSearchResults = (results) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload: results,
    };
};
