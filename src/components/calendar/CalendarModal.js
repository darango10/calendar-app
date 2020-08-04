import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {eventClearActiveEvent, eventStartAddNew, eventStartUpdating} from "../../actions/events";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0);
// const nowplus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: now.toDate()
}

const CalendarModal = () => {

    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(now.toDate());
    const [formValues, setFormValues] = useState(initEvent);
    const [titleValid, setTitleValid] = useState(true);
    const {title, notes, start, end} = formValues

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)
    const {uid, name} = useSelector(state => state.auth)

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent, setFormValues])


    const closeModal = () => {
        dispatch(uiCloseModal())
        setFormValues(initEvent)
        dispatch(eventClearActiveEvent());
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha final debe ser mayor', 'error')
            return;
        }

        if (title.trim() === '') {
            setTitleValid(false)
            return;
        }

        // TODO: Realizar registro en base de datos

        // console.log(formValues)

        if (activeEvent) {
            dispatch(eventStartUpdating(formValues))
        } else {
            dispatch(eventStartAddNew(formValues));
        }


        setTitleValid(true);
        setFormValues(initEvent);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            {activeEvent ? <h1> Actualizar evento </h1> : <h1> Nuevo evento </h1>}

            <hr/>
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className='form-control'
                        minDate={dateStart}
                    />
                </div>

                <hr/>
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                     <textarea
                         type="text"
                         className="form-control"
                         placeholder="Notas"
                         rows="5"
                         name="notes"
                         value={notes}
                         onChange={handleInputChange}
                     />
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                {activeEvent === null
                    ?
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                    :
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Actualizar</span>
                    </button>

                }


            </form>

        </Modal>
    );
};

export default CalendarModal;
