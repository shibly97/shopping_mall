import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import './css/ItemDis.css'
import {Carousel} from 'react-bootstrap' 
import {useSelector} from 'react-redux'

function ItemDis() {

    const {item_id} = useParams()
    const [itemDetails,setItemDetails] = useState({"item":{}})
    const [quantity,setQuantity] = useState(1)
    const [clickAddToCart,setClickAddToCart] = useState(false)
    const userid = useSelector(state => state.authReducer.user_id)

    useEffect (() =>{
        console.log(item_id)
        axios.post('/api/oneItem',{item_id})
        .then(res => {
            console.log(res.data)
            setItemDetails(res.data)
        })
    },[])

    const increase = () => {
        setQuantity((prev) => {
            return prev + 1
        })
    }

    const dicrease = () => {
        if(quantity > 0){
            setQuantity((prev) => {
                return prev - 1
            })
        }
    }

    const rating = () =>{
        var rate = Math.round(itemDetails.item.rating)
        var ratingDiv = []
  
        if(itemDetails.item.rating){
            for(var i=0; i<5; i++){
                if(rate>0){ 
                 
                    ratingDiv.push(<span className="iconify color-star" data-icon="mdi:star" data-inline="false" ></span>)
      
                    rate=rate-1;  
              }else{
                  ratingDiv.push(<span className="iconify normal-star" data-icon="mdi:star" data-inline="false" ></span>)
              }
                
            }
            return(
      
                <div className="rating">{ratingDiv.map(div => {
                    return div
                })}</div>
            )
  
        }
    }
    const oneTimeSell = () => {
      return(
          <>
            <div className="itemDis-seller">
                <div className="seller-name"><span>Seller : </span>{itemDetails.item.firstname}</div>
                <div className="seller-mobile"><span>Mobile : </span>{itemDetails.item.mobile}</div>
                <div className="seller-email"><span>Email : </span>{itemDetails.item.email}</div>
                <div className="seller-location"><span>Location : </span> {itemDetails.item.city}, {itemDetails.item.country}</div>
            </div>
          </>
      )
    }

    const manufacture = () =>{
        return(
            <>
            <div className="itemDis-quantity">
                <div className="quantity-label">Quantity</div>
                <Button onClick={dicrease}>-</Button>
                <div className="quantity-number">{quantity}</div>
                <Button onClick={increase}>+</Button>
            </div>
            <div className="itemDis-brand">
                {itemDetails.item.brand}
            </div>
            <div className="itemDis-rating">
               Rating : {rating()}
            </div>
            <div className="itemDis-seller">
                <div className="seller-name"><span>Seller : </span>{itemDetails.item.firstname}</div>
                <div className="seller-location"><span>Location : </span> {itemDetails.item.city}, {itemDetails.item.country}</div>
            </div>
            </>
            )
    } 

    const imageLoader = () =>{
        let images = [itemDetails.item.main_image]

        if(itemDetails.itemImages){
            itemDetails.itemImages.map((image) =>{
                return images = [...images,image.url]
            })
        }
        console.log(images)

      return(
          <Carousel className="or-carousel" fade interval={15000}>
              {images.map((image) => {
                  return(
                        <Carousel.Item>
                            <div className="itemDis-carousel">
                              <img
                                  className="d-block w-100"
                                  src={image}
                                  alt="First slide"
                                  />
                            </div>
                        </Carousel.Item>
                  )
              })}
          </Carousel>
      )
        
    }

    const itemPrice = () =>{
        let price = Number(itemDetails.item.price).toFixed(2)

        return(
            price
        )
    }

    const discount = () =>{

        if(itemDetails.item.discount){
            let discount = itemDetails.item.discount
            let discountPrice = (Number(itemDetails.item.price)/100)*discount*quantity
            return(
                discountPrice.toFixed(2)
            )
        }else{
            return(0.00)
        }
    }

    const total_price = () =>{
        let price = Number(itemDetails.item.price).toFixed(2)
        let toPrice = (price * quantity) +100 - discount()

        return(
            toPrice.toFixed(2)
        )
    }

    const getPrice = (price,discount) =>{
        var dbPrice = Number(price)
        var price = dbPrice.toFixed(2)

        if(!discount){
            return(price)
        }else{
            var disPrice = price - (price/100)*discount
            return(disPrice.toFixed(2))
        }

    }

    const addToCart = () => {
        axios.post('/upload/addToCart',{
            userid:userid,
            itemid:item_id,
            quantity:quantity,
            price:getPrice(itemDetails.item.price,itemDetails.item.discount),
            main_image: itemDetails.item.main_image,
            title:itemDetails.item.title,
            one_time_sell: itemDetails.item.one_time_sell,
            discount:itemDetails.item.discount,
            accesstoken:localStorage.getItem('accesstoken')
        })
        .then(res => {
            console.log(res)
            if(res.data.added==true){
                setClickAddToCart(true)
            }else if(res.data.authorized==false){

            }else{

            }
        })
        
    }

    return (
        <div className="itemDis-container" key={itemDetails.item.item_id}>
            <div className="itemDis-details">
                <div className="itemDis-title">{itemDetails.item.title}</div>
                <div className="itemDis-details-up">
                    <div className="itemDis-imgbox">
                       {imageLoader()}
                    </div>
                    <div className="itemDis-info">
                        {itemDetails.item.one_time_sell? oneTimeSell() : manufacture() }
                    </div>
                </div>
                <div className="itemDis-details-down">
                    <div className="itemDis-discription">
                        {itemDetails.item.discription}
                    </div>
                    <div className="itemDis-btn">
                        <Button>BUY NOW</Button>
                        {!clickAddToCart? <Button onClick={addToCart}>ADD TO CART</Button>: <Button>Added To Cart</Button>}
                    </div>
                </div>
            </div>

            <div className="itemDis-price">
                <div className="itemDis-calculate">
                    <div className="itemDis-price-keys">
                        <p>Item Price</p>
                        <p>Quantity</p>
                        <p>Delivery fee (Flat Rate)</p>
                        <p className="itemDis-discount">Discount</p>
                        <p className="itemDis-total">Total Price</p>
                    </div>

                    <div className="itemDis-price-values">
                        <p>Rs {itemPrice()}</p>
                        <p>{quantity}</p>
                        <p>Rs 100.00</p>
                        <p className="itemDis-discount">- Rs {discount()}</p>
                        <p className="itemDis-total">Rs {total_price()}</p>
                    </div>
                </div>

                <div className="itemDis-services">
                    <p><span class="iconify" data-icon="mdi:cash-marker" data-inline="false"></span>Cash on delivery available</p>
                    <p><span class="iconify" data-icon="mdi:map-marker-left" data-inline="false"></span>Pick up from store</p>
                    <p><span class="iconify" data-icon="mdi:arrow-horizontal-lock" data-inline="false"></span>Buyer protection</p>
                </div>
                <div className="itemDis-delivery">
                    <div className="itemDis-Address">
                        <p>Delivery Location</p>

                    </div>
                    <div className="itemDis-mobile">
                        
                    </div>
                    <div className="itemDis-change-btn">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ItemDis
