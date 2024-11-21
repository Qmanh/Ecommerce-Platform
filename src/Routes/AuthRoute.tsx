import { Navigate, Route, Routes } from 'react-router-dom'


const AuthRoute = (props: any) => {
    
    console.log(">>>props: ", props)

    if (!props.item.user) {
        
        return <Navigate to="/" />;
        
    }
    return (
        <>
            {props.children}

        </>
    )
}

export default AuthRoute