import React,{useState,useEffect} from 'react';
import {Link, useHistory,useLocation} from 'react-router-dom'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import { Icon, InlineIcon } from '@iconify/react';
import shoppingBag from '@iconify/icons-fa-solid/shopping-bag';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {connectedUrl,logout,authenticated} from '../redux/actions/authAction'
import './css/NavBar.css';

function NavBar() {

    const [mainCat,setMainCat] = useState([]) 
    const [subCat,setSubCat] = useState([])
    const history = useHistory()
    const location = useLocation()

    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => {
        return state.authReducer.authenticated
    })
    const redirectTo = (e) =>{
        let url = "/nav/category/" + e.target.innerHTML
          
        history.push(url)
    }

    const navLogin = () =>{
        dispatch(connectedUrl(location.pathname))
        history.push('/login')
    }

    const navLogout = () =>{
        // console.log("in navlogout")
        dispatch(logout())
        history.push('/login')
    }

    useEffect(() => {
        axios.get('/api/main_cat')
        .then(res => {
            setMainCat(res.data)
        })

        axios.get('/api/sub_cat')
        .then(res => {
            setSubCat(res.data)
            // console.log(res.data[0])
        })

        if(!isAuthenticated && localStorage.getItem('accesstoken')){
            axios.post('/auth/checkAccesstoken',{accesstoken:localStorage.getItem('accesstoken')})
            .then(res =>{
                if(res.data.authorized){
                    dispatch(authenticated(res.data.user_id))
                }else if(localStorage.getItem('refreshtoken')){
                    axios.post('/auth/checkRefreshtoken',{refreshtoken:localStorage.getItem('refreshtoken')})
                    .then(res => {
                        if(res.data.authorized){
                            localStorage.setItem("accesstoken", res.data.accesstoken)
                            localStorage.setItem("refreshtoken", res.data.refreshtoken)
                            dispatch(authenticated(res.data.user_id))
                        }
                    })
                }
            })
        }

    }, [])

    return (
        <div>
            <Navbar  className="bg-gray" expand ="md">

                <Navbar.Brand as={Link} to="/nav/home">
                Shopping Mall
                <Icon className="icon-shopping" icon={shoppingBag} />
                </Navbar.Brand>

                {/* the options goes into toggle */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">

                {/* navigations*/}
                    <Nav className="nav">
                        <Nav.Link as={Link} to='/nav/home' className='nav-link'>Home</Nav.Link>

                        <NavDropdown title="Category" id="basic-nav-dropdown">

                            {mainCat.map((main,index) =>{
                                return(
                            <>
                            <NavDropdown key={index} className="dropdown-second" title={main} id="basic-nav-dropdown" drop="right">
                                
                                {subCat.map((sub,index) =>{
                                    if(sub.main_cat == main){
                                        return(
                                            <NavDropdown.Item key={index} onClick={redirectTo} >{sub.sub_cat}</NavDropdown.Item>
                                        )
                                    }
                                })}
                            </NavDropdown>
                            </>
                                )
                            })}
                       
                        </NavDropdown>

                        <NavDropdown.Divider />
                        {isAuthenticated? <><NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item  as={Link} to="/nav/profile">Profile settings</NavDropdown.Item>
                        <NavDropdown.Item  as={Link} to="/nav/orders">Orders and Adds</NavDropdown.Item>
                        <NavDropdown.Item onClick={navLogout} >Logout</NavDropdown.Item>
                        </NavDropdown> <Nav.Link as={Link} to='/nav/cart' className='nav-link'>Cart</Nav.Link> </>
                        :  <Nav.Link onClick={navLogin} to='/login' className='nav-link'>Login</Nav.Link>}
                       
                        <Nav.Link as={Link} to='/nav/post' className='nav-link'>Post a Add</Nav.Link>
                    </Nav>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                </Navbar.Collapse>
            </Navbar>
        </div>

    )
}

export default NavBar
