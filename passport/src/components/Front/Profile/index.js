import {Component} from "react";
import {Navigate} from "react-router-dom";

class Profile extends Component{


    render() {
        const {user} = this.props;

        if (!localStorage.getItem("token")){
            return <Navigate to={"/login"}/>
        }

        return (
            <div>
                <div className={"jumbotron col-lg-4 offset-lg-4 mt-5"}>
                    <h3 className={"text-center"}>Kullanıcı Profili</h3>

                    <ul className="list-group">
                        <li className="list-group-item">Name : {user.name}</li>
                        <li className="list-group-item">E-Mail : {user.email}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile;
