import {types} from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import {prepareEvents} from "../helpers/prepareEvents";
import * as Swal from "sweetalert2";


export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth;

        try {
            const response = await fetchConToken('events', event, 'POST');
            const body = await response.json();

            if (body.ok) {
                event.id = body.evento._id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event));
                dispatch(eventStartLoading());
            }


        } catch (err) {
            console.log(err);
        }
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvents
})

export const eventStartUpdating = (event) => {
    return async (dispatch) => {

        try {

            const response = await fetchConToken(`events/${event._id}`, event, 'PUT')
            const body = await response.json();

            if (body.ok) {
                dispatch(eventUpdate(event))
                dispatch(eventStartLoading())
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (err) {
            console.log(err);
        }
    }
}

export const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = (event) => {
    return async (dispatch) => {
        try {

            const response = await fetchConToken(`events/${event._id}`, event, 'DELETE')
            const body = await response.json();

            if (body.ok) {
                dispatch(eventDelete())
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (err) {
            console.log(err);
        }
    }
}

export const eventDelete = () => ({
    type: types.eventDelete
})

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {
            const response = await fetchConToken('events')
            const body = await response.json();
            const events = prepareEvents(body.eventos)

            if (body.ok) {
                // console.log(events)
                dispatch(eventsLoading(events))
            }


        } catch (err) {
            console.log(err);
        }
    }
}

export const eventsLoading = (events) => ({
    type: types.eventLoaded,
    payload: events
})
