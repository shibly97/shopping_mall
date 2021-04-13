import axios from 'axios'

export function loading(){
    return({
        type:'loading',
    })
}

export const authenticated = (user_id) => {
    return({
        type:'authenticated',
        payload:{
            user_id: user_id
        }
    })
}

export const authenticationFail = (err) => {
    return({
        type:"authenticat-fail",
        payload:{
            err: err
        }
    })
}

export const connectedUrl = (location) =>{
    return ({
        type: "connectedUrl",
        payload:{
            location
        }
    })
}

export const login = (values) => {
    console.log("you are in authaction")
    return (dispatch) =>{
        dispatch(loading())
        axios.post('/auth/login',values)
        .then(res => {
            console.log(res.data)
            console.log(res.data.accesstoken)
            if(res.data.authorized==true){
                localStorage.setItem("accesstoken", res.data.accesstoken)
                localStorage.setItem("refreshtoken", res.data.refreshtoken)
                return dispatch(authenticated(res.data.user_id))
            }
            else if(res.data.authorized==false){
                return dispatch(authenticationFail(res.data.err))
            }
            })
    }
}

export const logout = () => {

    axios.post('/auth/logout',{refreshtoken: localStorage.refreshtoken})
    .then(res => console.log(res))

    localStorage.removeItem('accesstoken')
    localStorage.removeItem('refreshtoken')

    return({
        type:'logout'
    })

}