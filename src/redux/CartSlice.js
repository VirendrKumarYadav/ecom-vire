import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    carts: [],
    cartTotal: [],
    payDetails:{},
    orderID:""
}

const cartSlice = createSlice({

    name: "cart",
    initialState: initialState,
    reducers: {
      
        setCarts: (state, action) => {
            state.carts = action.payload ;
        },
        setCartTotalAmt: (state, action) => {
            state.cartTotal = action.payload;
        },
        
        setPayDetails:(state,action)=>{
            state.payDetails = action.payload;
        },
        setOrderCrateID:(state,action)=>{
            state.orderID = action.payload;
        },
    }

})

export const  {setCarts ,setCartTotalAmt,setPayDetails,setOrderCrateID} =cartSlice.actions;
export default cartSlice.reducer;