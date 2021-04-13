const initialState = {
    checkoutItems: [],
    totalPrice: 0
}

const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case 'addToCheckout':
            return({
                checkoutItems: [...state.checkoutItems, action.payload.item],
            })
        case 'removeFromCheckout':
            var newItems = state.checkoutItems.filter((item) =>{
                return item.itemid != action.payload.itemid
            })
            return({
                checkoutItems : newItems
            })
        case 'increaseQuantity':
            const newArr1 = state.checkoutItems.map(item =>{
                if(item.itemid == action.payload.itemid){
                    return {...item, quantity : Number(item.quantity)+ 1}
                }else{
                    return{...item}
                } 
            })
            return ({
                checkoutItems : newArr1
            })
        case 'dicreaseQuantity':
            const newArr2 = state.checkoutItems.map(item =>{
                if(item.itemid == action.payload.itemid){
                    return {...item, quantity : item.quantity-1}
                }else{
                    return{...item}
                }
                
            })
            return ({
                checkoutItems : newArr2
            })
        case 'refresh':
            return initialState
        default : 
            return state
    }
}

export default cartReducer