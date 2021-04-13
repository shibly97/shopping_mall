import React,{useState,useEffect} from 'react'
import {Carousel,Button} from 'react-bootstrap'
import './css/home.css'
import Item from '../components/Item.js'
import InfinityScroll from '../components/InfinityScroll.js'

function Home() {

    const [selectedPic,setSelectedPic]=useState([])

    const mobilepic = ["https://images.unsplash.com/photo-1583845797544-2e2346a45e35?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80","https://images.unsplash.com/photo-1606217213899-7d8a84fdbe8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80","https://images.unsplash.com/photo-1517155505529-258758459af8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80","https://images.unsplash.com/photo-1613536491198-a0afa1916b3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80","https://images.unsplash.com/photo-1589579234083-e364ef7b8592?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"]

    const desktopPic=["https://images.unsplash.com/photo-1599396002939-7e3f7cc12b26?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=828&q=80","https://images.unsplash.com/photo-1599722724426-b72538050848?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80","https://images.unsplash.com/photo-1572656934803-d2162b2e98bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80","https://images.unsplash.com/photo-1508896694512-1eade558679c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80","https://images.unsplash.com/photo-1611153662661-b83b38471b8d?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"]

    const checkResolution = () =>{
      console.log("checking")
      if(window.innerWidth <= 600){
        setSelectedPic(mobilepic)
      }else{
        setSelectedPic(desktopPic)
      }
    }

    // window.addEventListener('resize',checkResolution)

    useEffect(() => {
        checkResolution()
    }, [])

    return (
      <>
        <div className="carousel-container">
            <Carousel>

                <Carousel.Item>
                <div className="carousel-box">
                    <img
                    className="d-block w-100"
                    src={selectedPic[0]}
                    alt="First slide"
                    />
                    <div className="carousel-shadow">
                    </div>
                    <Carousel.Caption>
                    <h3>Best Vehicle Deals</h3>
                    <p>Different range of vehicles which fullfill your needs from more than 200 sellers.</p>
                    <Button>SHOP NOW</Button>
                    </Carousel.Caption>
                   
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                <div className="carousel-box">
                    <img
                    className="d-block w-100"
                    src={selectedPic[1]}
                    alt="First slide"
                    />
                     <div className="carousel-shadow">
                    </div>
                    <Carousel.Caption>
                    <h3>Find your dream mobile</h3>
                    <p>We have more than 200 fresh mobile sellers with our platform and every day posting mobile adds</p>
                    <Button>SHOP NOW</Button>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                

                <Carousel.Item>
                <div className="carousel-box">
                    <img
                    className="d-block w-100"
                    src={selectedPic[2]}
                    alt="First slide"
                    />
                     <div className="carousel-shadow">
                    </div>
                    <Carousel.Caption>
                    <h3>Decorate your Kitchen as you wish</h3>
                    <p>Shopping mall got direct manufacturing agents to buy your kitchen needs</p>
                    <Button>SHOP NOW</Button>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                <div className="carousel-box">
                    <img
                    className="d-block w-100"
                    src={selectedPic[3]}
                    alt="First slide"
                    />
                     <div className="carousel-shadow">
                    </div>
                    <Carousel.Caption>
                    <h3>Make kids happy</h3>
                    <p>Find best and well designed kids wear and quality toys </p>
                    <Button>SHOP NOW</Button>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                <div className="carousel-box">
                    <img
                    className="d-block w-100"
                    src={selectedPic[4]}
                    alt="First slide"
                    />
                     <div className="carousel-shadow">
                    </div>
                    <Carousel.Caption className="carousel-caption">
                    <h3>Stay fit Stay healthy</h3>
                    <p>Shopping mall have got verity of fittness and health equipment to help keep you fit.</p>
                    <Button>SHOP NOW</Button>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

        <div className="home-items-container">
        <InfinityScroll getItems="getItems"/>
        </div>

        
        </>
    )
}

export default Home
