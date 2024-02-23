import {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token : '',
            email: '',
            password : '',
            password_confirmatiion : '',
            message : '',
            isReset : false
        }
    }

    onChangeStateData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({[name]: value});
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        const {token,email,password,password_confirmation} = this.state;
        const data = {
            token,
            email,
            password,
            password_confirmation
        }

        axios.post("/auth/forget/resetpassword", data).then((res) => {
            if (res.data.success) {
                console.log(res.data.message);
                this.setState({
                    isReset : true,
                    message : ''
                })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({message: err.response.data.message});
        });
    }

    render() {
        let messageData = "";

        if (this.state.isReset){
            return  <Navigate to={"/login"}/>
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
                    <h3 className={"text-center"}>Şifre Sıfırla</h3>

                    {messageData}

                    <form onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                            <label>Token</label>
                            <input required name={"token"} onChange={this.onChangeStateData} type="text"
                                   className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>

                        <div className="form-group">
                            <label>E-Mail Adresi</label>
                            <input required name={"email"} onChange={this.onChangeStateData} type="email"
                                   className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>

                        <div className="form-group">
                            <label>Şifre</label>
                            <input required name={"password"} onChange={this.onChangeStateData} type="password"
                                   className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>

                        <div className="form-group">
                            <label>Şifre Tekrar</label>
                            <input required name={"password_confirmation"} onChange={this.onChangeStateData} type="password"
                                   className="form-control"
                                   aria-describedby="emailHelp"/>
                        </div>

                        <p>Zaten üye misin ? <Link to={"/login"}>Giriş Yap</Link></p>
                        <p>Hesabın Yok Mu ? <Link to={"/register"}>Kayıt Ol</Link></p>

                        <button type="submit" className="btn btn-primary btn-block">Şifre Sıfırla</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword;
