import React from 'react';
import {useDispatch} from "react-redux";
import {uiOpenModal} from "../../actions/ui";

const AddNewfab = () => {

    const dispatch = useDispatch();


    const handleAdd = () => {
        dispatch(uiOpenModal())
    }

    return (

        <button
            className="btn btn-primary fab"
            onClick={handleAdd}
        >
            <i className='fas fa-plus'/>
        </button>
    );
};

export default AddNewfab;
