import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    modalType: "", // Modal name (id)
    modalData: {}
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.modalData = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.modalData = {}
        }
    },
})


export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer