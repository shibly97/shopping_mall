const initialState = {
    authenticated: false,
    loading:false,
    user_id: null,
    error:null,
    connectedUrl: null
}

const authReducer = (state=initialState,action) => {
    switch (action.type){
        case 'authenticated':
            console.log("reducer auth")
            return({
                ...state,
                authenticated: true,
                loading:false,
                user_id: action.payload.user_id,
                error:null
            })
        case "authenticat-fail":
            return({
                ...state,
                authenticated: false,
                loading:false,
                user_id: null,
                error:action.payload.err
            })
        case 'loading':
            return({
                ...state,
                loading: true
            })
        case 'connectedUrl':
            return({
                ...initialState,
                connectedUrl: action.payload.location
            })

        case "logout":
            return({
                ...initialState
            })
        // case "force-logout":
        //     return({
        //         ...initialState
        //     })
        default:
            return state
    }
}

export default authReducer