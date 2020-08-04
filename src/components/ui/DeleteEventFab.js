import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {eventStartDelete} from "../../actions/events";
import * as Swal from "sweetalert2";

const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const {activeEvent} = useSelector(state => state.calendar)

    const handleDelete = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "No puedes deshacer esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                dispatch(eventStartDelete(activeEvent))
                Swal.fire(
                    'Eliminado!',
                    'El evento ha sido eliminado.',
                    'success'
                )
            }
        })

    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className='fas fa-trash'/>
            <span> Eliminar</span>
        </button>
    );
};

export default DeleteEventFab;
