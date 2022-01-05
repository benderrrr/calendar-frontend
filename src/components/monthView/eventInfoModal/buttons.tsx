import React, {useMemo} from 'react';
import {IconButton, Tooltip} from "@mui/material";

import './eventInfoModal.css';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch} from "../../../redux/hooks";
import {IEventData} from "../interfaces";
import {deleteEvent} from "../../../redux/reducers/calendar/calendarSlice";
import {getDateKeyFromEvent} from "../../../utils/generic";
import {modalsTypes, openModal} from "../../../redux/reducers/modals/modalsSlice";


interface IInfoModalButtons {
  onExit: () => void,
  event: IEventData
}

const InfoModalButtons: React.FC<IInfoModalButtons> = ({
                                                         onExit,
                                                         event
                                                       }) => {
  const dispatch = useAppDispatch();
  const buttonArray = useMemo(() => [
    {
      title: 'Edit',
      icon: EditIcon,
      onClick: () => dispatch(
        openModal({
            modalType: modalsTypes.editEvent,
            modalMetaData: {
              date: new Date(event.year, event.month, event.day),
              dateKey: getDateKeyFromEvent(event),
              eventData: event,
            }
          }
        )
      )
    },
    {
      title: 'Delete',
      icon: DeleteIcon,
      onClick: () => {
        event.id && dispatch(deleteEvent({id: event.id, dateKey: getDateKeyFromEvent(event)}))
        onExit()
      }
    },
    {
      title: 'Close',
      icon: CloseIcon,
      onClick: onExit
    },
  ], [dispatch, event, onExit])
  return (
    <div className={'buttons'}>
      {buttonArray.map(buttonData => (
        <Tooltip title={buttonData.title} key={buttonData.title}>
          <IconButton size="small" onClick={buttonData.onClick}>
            <buttonData.icon/>
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}

export default InfoModalButtons;