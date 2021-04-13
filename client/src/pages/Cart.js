import React,{useEffect,useState} from 'react'
import {Button} from 'react-bootstrap'
import './css/cart.css'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {addToCheckout,removeFromCheckout,increaseQuantity,dicreaseQuantity,refresh} from '../redux/actions/cartActions'
import {useHistory} from 'react-router-dom'

function Cart() {

    const userid = useSelector(state => state.authReducer.user_id)
    const [cartItems,setCartItems] = useState([])
    const checkoutItems = useSelector(state => state.cartReducer.checkoutItems)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        axios.post('/api/getCart',{
            accesstoken: localStorage.getItem('accesstoken'),
            userid: userid
        }).then(res => {
            // console.log(res.data.cart)
            setCartItems(res.data.cart)
        })
        dispatch(refresh())
    }, [])

    const removeItem =(itemIndex,itemid) =>{
        var newArray = cartItems.filter((item,i) =>{
            return i !== itemIndex
        })

        axios.post('/remove/cartItem',{
            accesstoken: localStorage.getItem('accesstoken'),
            userid: userid,
            itemid:itemid
        })
        .then(res =>{
            if(res.data.removed){
                dispatch(removeFromCheckout(cartItems[itemIndex]))
                setCartItems(newArray)
            }else{
                
            }
        })
        .catch(err => {
            console.log("issue with request", err)
        })
        
    }

    const checkboxClick = (e) => {
        if(e.target.checked){
            console.log(cartItems[e.target.value])
            dispatch(addToCheckout(cartItems[e.target.value]))
        }else{
            dispatch(removeFromCheckout(cartItems[e.target.value]))
        }
    }

    const totalPrice = checkoutItems.reduce((sum,item)=>{
        var price = sum+(Number(item.price)*Number(item.quantity))
        return (price)
    },0)

    const increaseQ = (e) => {
       console.log(e.target.value)
       const newArr = cartItems.map((item,index) =>{
           if(e.target.value==index){
               return {...item, quantity: Number(item.quantity)+1}
           }else{
               return {...item}
           }
       }) 
       dispatch(increaseQuantity(cartItems[e.target.value]))
       setCartItems(newArr)
    }

    const dicreaseQ = (e) => {
        const newArr = cartItems.map((item,index) =>{
            if(e.target.value==index & item.quantity > 1){
                return {...item, quantity: Number(item.quantity)-1}
            }else{
                return {...item}
            }
        }) 
        if(cartItems[e.target.value].quantity > 1){
            dispatch(dicreaseQuantity(cartItems[e.target.value]))
        }
        setCartItems(newArr)
     }
    
     const getDiscription = (item) => {
        var url = '/nav/itemDis/' + item.itemid
        console.log(url)
        history.push(url)
    }

    console.log(checkoutItems)
    console.log(cartItems)
    return (
        <>    
        <div className="cart-container">
            <div className="cart-item-container">
                <div className="cart-header">
                    {cartItems.length} Items in the cart
                </div>
                {cartItems.map((item,index) =>{
                    {/* console.log(index) */}
                    return (<div className="cart-item" key={item.itemid}>

                    <div className="cart-select-button">
                        <input type="checkbox" value={index} onClick={checkboxClick} ></input>
                    </div>

                    <div className="cart-img-container">
                        <div className="cart-img-box" onClick={() => getDiscription(item)}>
                            <img src={item.main_image}></img>
                        </div>
                    </div>

                    <div className="cart-item-detail">
                        <div className="cart-item-title">
                            {item.title}
                        </div>
                        <div className="cart-item-selection">
                        {item.one_time_sell? <p>One time sell</p>
                            : <>
                            <p>Quantity {item.quantity}
                            <Button value={index} onClick={increaseQ}>+</Button>
                            <Button value={index} onClick={dicreaseQ}>-</Button></p>
                            </>
                        }
                        {item.discount? <p className="cart-off">{item.discount}% OFF</p>: <></>}
                            
                        </div>
                        <div className="cart-img-price">
                            Rs {item.price}
                        </div>
                        <div className="cart-item-button">

                            <Button onClick={() => removeItem(index,item.itemid)}>Remove</Button>
                        </div>
                    </div>
                </div>)
                })}
            </div>

            <div className="cart-payment-container">
                <div className="cart-payment-header">
                    order list
                </div>
                {checkoutItems.map(item => {
                    return(
                        <div className="cart-item-price-box">
                            <div className="cart-item-name">
                                {item.title} * {item.quantity}
                            </div>
                            <div className="cart-item-price">
                                Rs {(item.price*item.quantity).toFixed(2)}
                            </div>
                        </div>
                    )
                })}
                
                <div className="cart-total-price-box">
                    <div className="cart-total-price-lable">Total</div>
                    <div className="cart-total-price">Rs {totalPrice}</div>
                </div>
                <div className="cart-item-price-buttons">
                    <Button>Check Out</Button>
                    <p>OR</p>
                    <Button>Save to buy later</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Cart
