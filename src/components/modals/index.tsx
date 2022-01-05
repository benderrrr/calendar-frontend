import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {modalsTypes, selectModalData} from "../../redux/reducers/modals/modalsSlice";
import EditEventModal from "../monthView/editEventModal/editEventModal";
import {IEventData, IEventModalData} from "../monthView/interfaces";
import EventInfoModal from "../monthView/eventInfoModal/eventInfoModal";


const Modals: () => (null | JSX.Element) = () => {
    const modalData = useAppSelector(selectModalData);
    if (!modalData.modalType || !modalData.modalMetaData) return null;

    switch (modalData.modalType) {
        case modalsTypes.editEvent: {
            return (
                <EditEventModal
                    date={(modalData.modalMetaData as IEventModalData).date}
                    dateKey={(modalData.modalMetaData as IEventModalData).dateKey}
                    eventData={(modalData.modalMetaData as IEventModalData).eventData}
                />
            )
        }
        case modalsTypes.showEvent: {
            return (
                <EventInfoModal event={modalData.modalMetaData as IEventData}/>
            )
        }
        default:
            return null
    }
}

export default Modals;
