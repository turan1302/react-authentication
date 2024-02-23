import {Component} from "react";
import Nav from "./Nav";

class Header extends Component {


    render() {
        return (
            <div>
                <Nav setUser={this.props.setUser} />
            </div>
        )
    }
}

export default Header;
