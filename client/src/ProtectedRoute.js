import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Route,Redirect,useLocation} from 'react-router-dom'
import axios from 'axios'
import {authenticated,connectedUrl} from './redux/actions/authAction'


function ProtectedRoute({component:Component,...rest}) {

const isAuthenticated = useSelector(state => state.authReducer.authenticated)
const dispatch = useDispatch()
const location = useLocation()

return (
    <Route {...rest} render={props => {
        if(isAuthenticated){
            return <Component/>
        }else if(localStorage.getItem('accesstoken')){
            axios.post('/auth/checkAccesstoken',{accesstoken : localStorage.getItem('accesstoken')})
            .then(res => {
               if(res.data.authorized){
                   dispatch(authenticated(res.data.user_id))
               }else if(localStorage.getItem('refreshtoken')){
                    axios.post('/auth/checkRefreshtoken',{refreshtoken : localStorage.getItem('refreshtoken')})
                    .then(res => {
                        if(res.data.authorized){
                            localStorage.setItem("accesstoken", res.data.accesstoken)
                            localStorage.setItem("refreshtoken", res.data.refreshtoken)
                            dispatch(authenticated(res.data.user_id))
                        }else{
                            dispatch(connectedUrl(location.pathname))
                            return <Redirect to={{pathname: '/login' , state: {from:props.location}}} />
                        }
                    })
               }
            })
        }else{
            dispatch(connectedUrl(location.pathname))
            return <Redirect to={{pathname: '/login' , state: {from:props.location}}} />
        }
    }} />
)

}

export default ProtectedRoute
