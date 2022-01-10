import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../store";
import {IAllEventsModalData, IEventData, IEventModalData} from "../../../components/monthView/interfaces";

export enum modalsTypes {
  editEvent = 'editEvent',
  showEvent = 'showEvent',
  allEvents = 'allEvents',
}

export type modalMetaDataType = IAllEventsModalData | IEventModalData | IEventData | null

export interface ModalState {
  modalType: modalsTypes | null;
  modalMetaData: modalMetaDataType;
}

const initialState: ModalState = {
  modalType: null,
  modalMetaData: null,
}


export const modalsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: modalsTypes, modalMetaData: modalMetaDataType }>) => {
      state.modalType = action.payload.modalType
      state.modalMetaData = action.payload.modalMetaData
    },
    closeModal: (state) => {
      state.modalType = null
      state.modalMetaData = null
    },
  }
});

export const selectModalData = (state: RootState) => ({
  modalType: state.modals.modalType,
  modalMetaData: state.modals.modalMetaData,
});


export const {closeModal, openModal} = modalsSlice.actions;


export default modalsSlice.reducer;
