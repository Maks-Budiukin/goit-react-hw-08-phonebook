import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";




export const PrivateRoute = ({ component: Component, redirectTo }) => {
    const token = useSelector(state => state.auth.token)
    const isRefreshing = useSelector(state => state.auth.isRefreshing)
    const shouldRedirect = !token && !isRefreshing;

    return shouldRedirect ? <Navigate to={redirectTo} /> : <Component/>
}