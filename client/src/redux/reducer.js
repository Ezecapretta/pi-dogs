import {GET_DOGS, GET_DOG_BY_ID, SET_FILTER, SET_SORT, GET_TEMPERAMENTS, CREATE_DOG, SEARCH_DOGS_BY_NAME, SET_SEARCH_RESULTS} from './action-type'
const initialState = {
    allDogs: [],
    dogDetail: [],
    filter: 'all',
    sort: 'none',
    temperaments: [],
    searchResults: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case GET_DOG_BY_ID: 
            return {
                    ...state,
                    dogDetail: action.payload
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case SET_SORT:
            return {
                ...state,
                sort: action.payload
            };
        case CREATE_DOG:
            return {
                ...state,
                allDogs: [...state.allDogs, action.payload],
            };
        case SEARCH_DOGS_BY_NAME:
            return {
                ...state,
                searchResults: action.payload,
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
            };
        default: 
            return {...state}
    }
}

export default reducer