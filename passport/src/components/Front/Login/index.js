import {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: '',
            loggedIn: false,
        }
    }

    onHandleChangeState = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    onHandleLogin = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        axios.post("/auth/login", {
            email,
            password
        }).then((res) => {
            localStorage.setItem("token", res.data.data.token);
            this.setState({
                loggedIn: true,
                messagge: '',
            })
            this.props.setUser(res.data.data.user);
        }).catch((err) => {
            console.log(err);
            this.setState({message: err.response.data.message});
        })
    }

    render() {
        let messageData = "";

        if (this.state.loggedIn) {
            return <Navigate to={"/profile"}></Navigate>
        }


        if (this.state.message) {
            messageData = (
                <div className={"col-md-12 alert alert-danger text-center"}>
                    {this.state.message}
                </div>
            );
        }

        return (
            <div>
                <div className={"jumbotron col-lg-4 offset-lg-4 mt-5"}>
                    <h3 className={"text-center"}>Giriş Yap</h3>


                    {messageData}

                    <form onSubmit={this.onHandleLogin}>
                        <div className="form-group">
                            <label>E-Mail Adresi</label>
                            <input type="email" required name={"email"} onChange={this.onHandleChangeState}
                                   className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="form-group">
                            <label>Şifre</label>
                            <input required type="password" name={"password"} onChange={this.onHandleChangeState}
                                   className="form-control"/>
                        </div>

                        <p>Şifreni mi kaybettin ? <Link to={"/forget"}>Hemen Sıfırla</Link></p>
                        <p>Hesabın Yok Mu ? <Link to={"/register"}>Kayıt Ol</Link></p>

                        <button type="submit" className="btn btn-primary btn-block">Giriş Yap</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
