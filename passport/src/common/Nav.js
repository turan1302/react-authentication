import {Component} from "react";
import {Link, NavLink} from "react-router-dom";

class Nav extends Component {


    logOut = () => {
        localStorage.clear();
        this.props.setUser({});
    }

    render() {

        let button;
        let profileButton;

        if (localStorage.getItem("token")) {
            profileButton = (
                <li className="nav-item">
                    <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}
                             to={"/profile"}>Profile</NavLink>
                </li>
            );

            button = (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}
                                 to={"/"} onClick={this.logOut}>Logout</NavLink>
                    </li>
                </ul>
            );
        } else {
            profileButton = ("");

            button = (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}
                                 to={"/login"}>Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}
                                 to={"/register"}>Register</NavLink>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand active" to={"/"}>MFSoftware</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"}
                                         to={"/"}>Home</NavLink>
                            </li>
                            {profileButton}
                        </ul>
                        <span className="navbar-text">

                            {button}
    </span>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;
