// RRD IMPORTS
import { Form, NavLink } from "react-router-dom";

// IMPORT LAYOUT
import { UserName } from "../layout/Main"

// IMPORT ASSETS
import logo from "../assets/logomark.svg"
// library imports
import { TrashIcon } from "@heroicons/react/24/solid";

type NavbarPropsType = {
    userName: UserName, 

}

function Navbar(props:  NavbarPropsType) {
    const { userName } = props;

  return (
    <nav>
        <NavLink to="/" aria-label="Go to home">
            <img src={logo} alt="logo-image" height={30}/>
            <span> Home Budget</span>
        </NavLink>
        {
            userName && Object.keys(userName)?.length > 0 &&  (
                <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("Do you want to delete this user and all data ?")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit" className="btn btn--warning">
                        Delete User
                    <TrashIcon width={20} />
                    </button>
                </Form>
            )
        }
    </nav>
  )
}

export default Navbar
