import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products:[],
        quantity: 0,
        subtotal:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload) // contains list of objects with all the properties of pizzas, quantity, extraOptions and totalPrice
            state.quantity +=1 // this represents quantity of orders not pizzas
            state.subtotal+=action.payload.totalPrice
        },
        reset:(state)=>{
            state.products = [] // contains list of objects with all the properties of pizzas, quantity, extraOptions and totalPrice
            state.quantity = 0 // this represents quantity of orders not pizzas
            state.subtotal = 0
        }
    }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;