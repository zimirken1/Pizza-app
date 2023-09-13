import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/NavBar/NavBar.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import "./styles/App.css"
import Footer from "./components/UI/Footer/Footer";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            if (data.roles.includes('Admin')) {
                user.setIsAdmin(true)
            }
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
});


export default App;