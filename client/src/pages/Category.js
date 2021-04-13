import React,{useState,useEffect} from 'react'
import './css/category.css'
import InfinityScroll from '../components/InfinityScroll.js'
import {useParams} from 'react-router-dom'
import {Jumbotron,Container} from 'react-bootstrap'

function Category() {

    let {sub_cat} = useParams();

    return (
        <div className="category-container">

            <Jumbotron fluid>
            <Container>
                <h1>{sub_cat}</h1>
                <p>
                Here you can find all of our {sub_cat}
                </p>
            </Container>
            </Jumbotron>

            <InfinityScroll key={sub_cat} cat={sub_cat}/>
        </div>
    ) 
}

export default Category
