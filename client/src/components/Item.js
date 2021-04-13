import React,{useState,useEffect} from 'react'
import './css/Item.css'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'


function Item({itemDetails}) {

    const [clickAddToCart,setClickAddToCart] = useState(false)
    const history = useHistory()
    const userid = useSelector(state => state.authReducer.user_id)

    const onetime = () =>{
        if(itemDetails.added_date){
            const date = new Date(itemDetails.added_date)
            const sdate = date.toLocaleDateString()

            if(itemDetails.price_negotiable){
                return(
                <div className="one-time">
                    <p><span class="iconify date-icon" data-icon="mdi:calendar-month-outline" data-inline="false"></span>Publish Date - {sdate}</p>
                    <p><span class="iconify price-nego-icon" data-icon="mdi:sticker-check-outline" data-inline="false"></span>Price is negotiable</p>
                </div>
                )
            }else{
                return(
                <div className="one-time">
                    <p><span class="iconify date-icon" data-icon="mdi:calendar-month-outline" data-inline="false"></span>Publish Date - {sdate}</p>
                    <p><span class="iconify price-nego-icon" data-icon="mdi:sticker-remove-outline" data-inline="false"></span>Price is not negotiable</p>
                </div>
                    )
            }
        }
    }

    const manufacture = () =>{
      var rate = Math.round(itemDetails.rating)
      var ratingDiv = []

      if(itemDetails.rating){
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

    const price = () =>{
        var dbPrice = Number(itemDetails.price)
        var price = dbPrice.toFixed(2)

        if(!itemDetails.discount){
            return(
                <div className="reguler-price">
                    <p>Rs {price}</p>
                </div>
            )
        }else{
            var disPrice = price - (price/100)*itemDetails.discount
            return(
                <div className="price-dis">
                    <p><span className="cut-price">Rs {price} </span><span className="dis">{itemDetails.discount}% OFF</span></p>
                    <p className="new-price">Rs {disPrice.toFixed(2)}</p>
                </div>
            )
        }
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

    const getDiscription = (itemDetails) => {
        var url = '/nav/itemDis/' + itemDetails.item_id
        console.log(url)
        history.push(url)
    } 

    const addToCart = () => {
        axios.post('/upload/addToCart',{
            userid:userid,
            itemid:itemDetails.item_id,
            quantity:1,
            price:getPrice(itemDetails.price,itemDetails.discount),
            main_image: itemDetails.main_image,
            title:itemDetails.title,
            one_time_sell:itemDetails.one_time_sell,
            discount:itemDetails.discount,
            accesstoken:localStorage.getItem('accesstoken')
        })
        .then(res => {
            console.log(res)
            if(res.data.added==true){
                setClickAddToCart(true)
            }else{

            }
        })
        
    }

    return (
        <div className="item-container" >

            <div className="item-imgbox" onClick={() => getDiscription(itemDetails)}>
                <img src={itemDetails.main_image}/>
            </div>

            <div className="item-infobox">

                <div className="item-infoDetails" onClick={() => getDiscription(itemDetails)}>
                <h5>{itemDetails.title}</h5>
                {itemDetails.one_time_sell? onetime(): manufacture() }
                {price()}
                </div>

                <div className="item-button">
                {!clickAddToCart? <Button className="item-btn" onClick={addToCart}>Add To Cart</Button>: <Button>Added To Cart</Button>}
                </div>
            </div>
        </div>
    )
}

export default Item
