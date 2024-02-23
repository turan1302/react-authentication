import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Front/Home";
import Header from "../common/Header";
import Profile from "./Front/Profile";
import Missing from "./Front/Missing";
import Login from "./Front/Login";
import Register from "./Front/Register";
import Forget from "./Front/Forget";
import axios from "axios";
import ResetPassword from "./Front/ResetPassword";

class FrontAppComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user : {}
        }
    }

    componentDidMount= ()=> {
        axios.get("/auth/user").then((res) => {
            this.setUser(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    setUser = (res) => {
        this.setState({user: res});
    }

    render() {

        const {user} = this.state;

        return (
            <div>
                <Header setUser={this.setUser} />
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/profile"} element={<Profile user={user}/>}></Route>
                    <Route path={"/login"} element={<Login setUser={this.setUser}/>}></Route>
                    <Route path={"/register"} element={<Register setUser={this.setUser} />}></Route>
                    <Route path={"/forget"} element={<Forget/>}></Route>
                    <Route path={"/resetpassword"} element={<ResetPassword/>}></Route>
                    <Route path={"*"} element={<Missing/>}></Route>
                </Routes>
            </div>
        )
    }
}

export default FrontAppComponent;
