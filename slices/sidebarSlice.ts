import { createSlice } from '@reduxjs/toolkit'

export interface sliderState {
    toggleCollapse: boolean
}

const initialState: sliderState = {
    toggleCollapse: false,
}

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        clickCollapse: (state) => {
            state.toggleCollapse = !state.toggleCollapse
        }
    },
})

// Action creators are generated for each case reducer function
export const { clickCollapse } = sliderSlice.actions

export default sliderSlice.reducer