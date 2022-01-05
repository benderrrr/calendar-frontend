import React, {useMemo, useRef, useState} from 'react';

import './eventsList.css';
import {IDay, IEventModalData} from "../interfaces";
import {useAppSelector} from "../../../redux/hooks";
import {selectCurrentMonth} from "../../../redux/reducers/generic/genericSlice";

interface IEventsComponent extends IDay {
}

const EventsList: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);


    return (
        <div className='events-wrapper'ref={wrapperRef}>


        </div>
    );
}

export default EventsList;
