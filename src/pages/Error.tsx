import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate, useRouteError, Link } from "react-router-dom"

type routeErrorType = {
    message: string, 
    statusText: string,
}

function Error() {
    const error = useRouteError() as routeErrorType;
    const navigate = useNavigate();
  return (
    <div className="error">
        <h1>Uh oh! We've got some problem.</h1>
        <p>{error.message || error.statusText}</p>
        <div className="flex-md">
            <button className="btn btn--dark" onClick={() => navigate(-1)} >
                <ArrowUturnLeftIcon width={20} />
                <span>Go back</span>
            </button>
            <Link to="/" className="btn btn--dark"> 
                <HomeIcon width={20} />
                <span>Go Home</span>
            </Link>
        </div>
    </div>
  )
}

export default Error
