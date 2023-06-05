import { Navigate, Outlet } from "react-router"
export const ProtectedRouteAdmin =({user}) =>{

        if(user !="admin"){
            return <Navigate to="/"/>
        }
    return <Outlet/>
}


export const ProtectedRouteUser =({user}) =>{
   
    if(user =="" && user=="admin"){
        return <Navigate to="/"/>
    }
return <Outlet/>
}
