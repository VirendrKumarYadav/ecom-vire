import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    carts: [],
    cartTotal: [],
}

const cartSlice = createSlice({

    name: "cart",
    initialState: initialState,
    reducers: {
      
        setCarts: (state, action) => {
            state.carts = action.payload ;
        },
        setCartTotalAmt: (state, action) => {
            state.cartTotal = action.payload ;
        }

    }

})

export const  {setCarts ,setCartTotalAmt} =cartSlice.actions;
export default cartSlice.reducer;