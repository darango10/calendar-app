import {types} from "../types/types";

// {
//     id: new Date().getTime(),
//         title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(3, 'hours').toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//     _id: '123',
//         name: 'Daniel'
//      }
// }


const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvents:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload._id) ? action.payload : e
                )
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    e => e._id !== state.activeEvent._id
                ),
                activeEvent: null
            }

        default:
            return state;
    }
}
