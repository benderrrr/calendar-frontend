import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {modalsTypes, selectModalData} from "../../redux/reducers/modals/modalsSlice";
import EditEventModal from "../monthView/editEventModal/editEventModal";
import {IAllEventsModalData, IEventData, IEventModalData} from "../monthView/interfaces";
import EventInfoModal from "../monthView/eventInfoModal/eventInfoModal";
import AllEventsModal from "../monthView/allEventsModal/allEventsModal";


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
    case modalsTypes.allEvents: {
      return (
        <AllEventsModal
          date={(modalData.modalMetaData as IAllEventsModalData).date}
          dateKey={(modalData.modalMetaData as IAllEventsModalData).dateKey}
        />
      )
    }
    default:
      return null
  }
}

export default Modals;
