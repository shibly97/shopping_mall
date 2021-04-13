import React,{useState, useRef} from 'react'
import {Form,Button} from 'react-bootstrap'
import shoppingIcon from '../images/shopping.png'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

function Register() {

    const reEnterPasswordRef = useRef()
    const history = useHistory()

    const [reEnterPasswordMsg,setReEnterPasswordMsg] = useState('')

    const registerUser = (e) =>{
        e.preventDefault()

        if(e.target[2].value == e.target[3].value){
            let values = {
                username: e.target[0].value,
                firstname: e.target[1].value,
                password: e.target[2].value,
                mobile:e.target[4].value
            }

            axios.post('/auth/register',values)
            .then(res => {
                console.log(res)
                if(res.data.register){
                    history.push('/login')
                }
            })

            setReEnterPasswordMsg('')
            e.target.reset()
        }else{
            reEnterPasswordRef.current.focus()
            setReEnterPasswordMsg('Incorrect password')
        }
       
    }

    return (
        <div className="login-container">
        <div className="login-form">
            <div className="header">
                <img src={shoppingIcon}/>
                <h2>Shopping Mall</h2>
            </div>
           
            <Form onSubmit={registerUser}>
                <Form.Group controlId="formBasicUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" required/>
                    <Form.Text className="text-muted">
                    Need to be unique
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete='true' placeholder="Password" required/>
                    <Form.Text className="text-muted">
            
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formReenterPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" autoComplete='true' placeholder="Password" ref={reEnterPasswordRef} required/>
                    <Form.Text className="text-muted">
                   {reEnterPasswordMsg}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formMobile">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" autoComplete='true' placeholder="Eg : 0771234567" required/>
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            
            </div>
        </div>
    )
}

export default Register
