import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffMember } from './types';
import { doctors, nurses } from '../mockData';

const initialState = {
    doctors,
    nurses,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addDoctor(state, action: PayloadAction<StaffMember>) {
            state.doctors.push(action.payload);
        },
        addNurse(state, action: PayloadAction<StaffMember>) {
            state.nurses.push(action.payload);
        },
        editDoctor(state, action: PayloadAction<{ index: number, doctor: StaffMember }>) {
            const { index, doctor } = action.payload;
            state.doctors[index] = doctor;
        },
        editNurse(state, action: PayloadAction<{ index: number, nurse: StaffMember }>) {
            const { index, nurse } = action.payload;
            state.nurses[index] = nurse;
        },
        deleteDoctor(state, action: PayloadAction<number>) {
            state.doctors.splice(action.payload, 1);
        },
        deleteNurse(state, action: PayloadAction<number>) {
            state.nurses.splice(action.payload, 1);
        },
    },
});

const store = configureStore({
    reducer: staffSlice.reducer,
});

export const { addDoctor, addNurse, editDoctor, editNurse, deleteDoctor, deleteNurse } = staffSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;
