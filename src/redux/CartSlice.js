import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    setCarts: [],
}

const cartSlice = createSlice({

    name: "cart",
    initialState: initialState,
    reducers: {
      
        setCarts: (state, action) => {
            state.setCarts = action.payload.results;
        }

    }

})

export const  {setCarts } =cartSlice.actions;
export default cartSlice.reducer;