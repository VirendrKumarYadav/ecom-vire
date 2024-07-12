import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    setProducts: [],
    carts: [],

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
            state.carts = action.payload;
        }

    }

})

export const  {setProducts,setCarts } =catalogSlice.actions;
export default catalogSlice.reducer;