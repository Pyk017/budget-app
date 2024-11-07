import { useFetcher } from "react-router-dom"

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg"
import { MutableRefObject, useEffect, useRef } from "react";

const Intro = () => {
    const fetcher = useFetcher()

    const isSubmitting = fetcher.state === "submitting";
    const focusRef = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (!isSubmitting) focusRef.current.focus();
    }, [isSubmitting]);


  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <fetcher.Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?" 
            aria-label="Your Name" 
            autoComplete="given-name"
            ref={focusRef}
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {
                isSubmitting ? (
                    <span>Creating account ...</span>
                ): (
                    <>
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </>
                )
            }
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  )
}
export default Intro