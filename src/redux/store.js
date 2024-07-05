import { configureStore } from "@reduxjs/toolkit"
import Catalog from "./CatalogSlice"
import CartSlice from "./CartSlice"
import loginSlice from "./login/loginSlice"

export const store = configureStore({

    reducer: {
        "catalog": Catalog,
        "cart": CartSlice,
        "loginAuth": loginSlice
    }
})


