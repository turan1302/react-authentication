import {Component} from "react";
import {Link,Navigate} from "react-router-dom";
import axios from "axios";
class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: '',
            loggedIn : false
        }
    }

    onHandleSubmit = (e)=>{
        e.preventDefault();
        const {name,email,password,password_confirmation} = this.state

        const data = {
            name,
            email,
            password,
            password_confirmation
        }

        axios.post("/auth/register",data).then((res)=>{
            if (res.data.success){
                localStorage.setItem("token",res.data.data.token);
                this.props.setUser(res.data.data.user);
                this.setState({
                    loggedIn : true,
                    messagge: '',
                })
            }
        }).catch((err)=>{
            console.log(err);
            this.setState({message: err.response.data.message});
        });
    }

    onHandleChangeState = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    render() {
        let messageData = "";

        if (this.state.loggedIn){
            return <Navigate to={"/profile"}/>
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
                    <h3 className={"text-center"}>Kayıt Ol</h3>

                    {messageData}

                    <form onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                            <label>Ad Soyad</label>
                            <input required name={"name"} onChange={this.onHandleChangeState} type="text" className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="form-group">
                            <label>E-Mail Adresi</label>
                            <input required name={"email"} onChange={this.onHandleChangeState} type="email" className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="form-group">
                            <label>Şifre</label>
                            <input required name={"password"} onChange={this.onHandleChangeState} type="password" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Şifre Tekrar</label>
                            <input type="password" name={"password_confirmation"} onChange={this.onHandleChangeState} required className="form-control"/>
                        </div>

                        <p>Zaten üye misin ? <Link to={"/login"}>Giriş Yap</Link></p>

                        <button type="submit" className="btn btn-primary btn-block">Kayıt Ol</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;
