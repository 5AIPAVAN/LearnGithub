import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdmin = () => {
    const authToken = localStorage.getItem('accessToken')
    return authToken ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedAdmin