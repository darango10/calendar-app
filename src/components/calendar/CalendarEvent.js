import React from 'react';

const CalendarEvent = ({event}) => {
    // console.log(event)
    return (
        <div>
            <strong>{event.title} </strong>
            <span>- {event.user.name}</span>
        </div>
    );
};

export default CalendarEvent;
