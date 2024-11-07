// RRD IMPORTS
import { Outlet, useLoaderData } from "react-router-dom";

// IMPORT ASSETS
import wave from "../assets/wave.svg";

// IMPORT HELPER FUNCTION
import { fetchData } from "../utils/helper";

// IMPORT COMPONENTS
import Navbar from "../components/Navbar";

// TYPES DECLARATION
export type UserName = string
export  type mainLoaderType = {
    userName: string
}

function Main() {
    const { userName }= useLoaderData() as mainLoaderType;

    console.log(userName)

  return (
    <div className="layout">
        <Navbar userName={userName as UserName} />
        <main>
            <Outlet />
        </main>
        <img src={wave} alt="wave-image" />
    </div>
  )
}

export default Main;
