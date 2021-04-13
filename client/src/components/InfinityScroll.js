import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import './css/InfinityScroll.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Spinner} from 'react-bootstrap' 
import Item from './Item.js'


function InfinityScroll({cat}) {

    const [items,setItems] = useState([])
    const [hasMore,setHasMore] = useState(true)
    const start= useRef(0)

    let url = ''
    let postData

    if(cat){
        url="/api/getCatItems"
        postData = {
            offset:start.current,
            cat: cat
        }
    }else{
        url="/api/getItems"
        postData = {
            offset:start.current
        }
    }

    useEffect(() => {
      
        axios.post(url,postData)
        .then(res => {
            if(res.data.length>0){
                start.current = start.current + 30
                setItems(res.data)
            }else{
                setHasMore(false)
            }
        })
        .catch(err =>{
            console.log(err)
            setHasMore(false)
        })
    }, [])

    

    const fetchItem = () =>{
      
        axios.post(url,postData)
        .then(res => {
            if(res.data.length>0){
                start.current = start.current + 30
                setItems(items.concat(res.data))
            }else{
                setHasMore(false)
            }
        })
        .catch(err =>{
            console.log(err)
            setHasMore(false)
        })
    }

    // console.log("category is " + cat)
    // console.log("Item length is " + items.length)
    // console.log("start.current is " + start.current)
    return (
        <div className="infintyScroll-container">
            <InfiniteScroll
                className="infintyScroll-box"
                dataLength={items.length}
                next={fetchItem}
                hasMore={hasMore}
                loader={<div className="loading-spin"><Spinner animation="grow" variant="info" /></div>}
            >
            {items.map((itemDetails,index) => {
                return <Item key={index} itemDetails={itemDetails} className="infinityScroll-item"/>
            })}

            </InfiniteScroll>

        </div>
    )
}

export default InfinityScroll
