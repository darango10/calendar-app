import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/es'
import Navbar from "../ui/Navbar";
import {messages} from "../../helpers/calendar-messages-es";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {eventClearActiveEvent, eventSetActive, eventStartLoading} from "../../actions/events";
import AddNewfab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale('es');
const localizer = momentLocalizer(moment)


const CalendarScreen = () => {

    const dispatch = useDispatch();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const {events} = useSelector(state => state.calendar)
    const {activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(eventStartLoading())
    },[dispatch])

    const onDoubleClick = () => {
        dispatch(uiOpenModal());

    }

    const onSelect = (e) => {
        dispatch(eventSetActive(e))

    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id)?'#367cf7':'#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 600}}
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onSelectSlot={onSelectSlot}
                    selectable={true}
                    onView={onViewChange}
                    view={lastView}
                />
            </div>

            <AddNewfab/>
            {activeEvent && <DeleteEventFab/>}


            <CalendarModal/>

        </div>
    );
};

export default CalendarScreen;
