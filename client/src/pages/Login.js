import React,{useEffect} from 'react'
import './css/login.css'
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import shoppingIcon from '../images/shopping.png'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login,logout} from '../redux/actions/authAction'

function Login() {

    const history = useHistory()
    const dispatch = useDispatch()

    const loginUser = (e) =>{

        e.preventDefault()
        let values = {
            username: e.target[0].value,
            password: e.target[1].value,
        }

        dispatch(login(values))

    }

    const authenticated = useSelector((state) => state.authReducer.authenticated
    )
     const connectedUrl = useSelector((state) => state.authReducer.connectedUrl)

    useEffect(() => {
       if(authenticated && connectedUrl){
        history.push(connectedUrl)
       }else if(authenticated) {
           history.push('/nav/home')
       }   
    }, [authenticated])

    // useEffect(() => {
    //    dispatch(logout())
    //  }, [])


    return (
    <div className="login-container">
    <div className="login-form">
        <div className="header">
            <img src={shoppingIcon}/>
            <h2>Shopping Mall</h2>
        </div>
       
        <Form onSubmit={loginUser}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete='true' placeholder="Password" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
        
        <p>Not register yet? Register from <Link to="/register">here</Link></p>
        </div>
    </div>
    )
}

export default Login
