export const addToCheckout = (item) =>{
    return({
        type: 'addToCheckout',
        payload: {
            item: item,
            itemPrice: item.price
        }
    })
}

export const removeFromCheckout = (item) =>{
    return({
        type: 'removeFromCheckout',
        payload: {
            itemid: item.itemid,
            itemPrice: item.price
        }
    })
}

export const increaseQuantity = (item) =>{
    return({
        type: 'increaseQuantity',
        payload: {
            itemid: item.itemid
        }
    })
    
}

export const dicreaseQuantity = (item) =>{
        return({
            type: 'dicreaseQuantity',
            payload: {
                itemid: item.itemid,
            }
        })
}

export const refresh =() =>{
    return({
        type:'refresh'
    })
}