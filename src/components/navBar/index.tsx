import React, {useEffect, useRef, useState} from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';


import './NavBar.css';
import {getBackGroundImage} from "../../redux/reducers/generic/genericSlice";
import {AppDispatch} from "../../redux/store";
import {useAppDispatch} from "../../redux/hooks";
import {listenForOutsideClicks} from "../../utils/generic";

const NavBar: React.FC = () => {
    const [isColorPicker, setIsColorPicker] = useState<boolean>(false)
    const [listening, setListening] = useState<boolean>(false);
    const [readyForSubmitColor, setReadyForSubmitColor] = useState<boolean>(true)
    const [color, setColor] = useState<string>(localStorage.getItem('bgColor') || "#FFF")
    const nodeRef = useRef<HTMLDivElement>(null)
    const colorChooserRef = useRef<HTMLDivElement>(null)
    const dispatch: AppDispatch = useAppDispatch()

    useEffect(listenForOutsideClicks(
        listening,
        setListening,
        colorChooserRef,
        setIsColorPicker,
    ));

    const changeColorHandler = (color: string): void => {
        setColor(color)
        localStorage.setItem('bgColor', color)
    }

    useEffect(() => {
        readyForSubmitColor && dispatch(getBackGroundImage(color.slice(1)))
    }, [dispatch, color, readyForSubmitColor])

    return (
        <nav className='nav-wrapper'>

            <div className='logo'>
                <EventNoteIcon/>
                <span>Calendar</span>
            </div>
        </nav>
    );
}

export default NavBar;
