import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    setProducts: [],
    setCarts: [],

}

const catalogSlice = createSlice({

    name: "catalog",
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            // console.log(state, action);
            state.setProducts = action.payload.results;
        },
        setCarts: (state, action) => {
            state.setCarts = action.payload.results;
        }

    }

})

export const  {setProducts,setCarts } =catalogSlice.actions;
export default catalogSlice.reducer;