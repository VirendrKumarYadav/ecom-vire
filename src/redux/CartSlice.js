import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    carts: [],
    cartTotal: [],
    payDetails:{}
    
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
        }
    }

})

export const  {setCarts ,setCartTotalAmt,setPayDetails} =cartSlice.actions;
export default cartSlice.reducer;