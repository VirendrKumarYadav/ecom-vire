import { createSlice } from "@reduxjs/toolkit";


const initialState={
    setLoginAuth:{},
}


const loginSlice=createSlice({
     name:"loginAuth",
     initialState:initialState,
     reducers: {

     setLoginAuth:(state,action)=>{
        // console.log(action);
        state.setLoginAuth=action.payload.results;
     }
     }
})

export const {setLoginAuth}=loginSlice.actions;
export default loginSlice.reducer;