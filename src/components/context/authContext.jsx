import { createContext, useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { useLocation } from "react-router-dom";

const UserContext = createContext(null)

const UserProvder = ({ children }) => {

    const location = useLocation()

    const dataUserDefault = {
        isLoadding: true,
        isAuthenticated: false,
        access_token: '',
        account: {}
    }

    const [user, setUser] = useState(dataUserDefault)

    const loginContext = (userData) => {
        setUser({ ...userData, isLoadding: false })
    }

    const logoutContext = () => {
        setUser({ ...dataUserDefault, isLoadding: false })
    }

    const fetchUser = async () => {
        let response = await AuthService.getAccount()
        if (response && response.EC === 0) {
            let full_name = response.data.full_name
            let email = response.data.email
            let avatar = response.data.avatar
            let role = response.data.role
            let access_token = response.data.token
            const dataUser = {
                isAuthenticated: true,
                access_token: access_token,
                account: { full_name, email, avatar, role },
                isLoadding: false
            }
            setTimeout(() => {
                setUser(dataUser)
            }, 1500)
        }
    }

    const pathToNoCheck = [
        '/',
        '/allproduct',
        '/detail',
        '/article',
        '/contact',
        '/login-register'
    ]

    useEffect(() => {
        if (location && !pathToNoCheck.includes(location.pathname)) {
            fetchUser()
        } else {
            setUser({ ...dataUserDefault, isLoadding: false })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvder, UserContext }