import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { useAppSelector } from '../State/Store'
import { Alert, AlertTitle, Button, Stack } from '@mui/material'

const PrivateRoute = (props: any) => {
    console.log(">>>props: ", props)

    if (localStorage.getItem("role")!= "ROLE_SELLER") {
        return <Navigate to="/" />;
    }
    return (
        <>
            {props.children}

        </>
    )
}

export default PrivateRoute