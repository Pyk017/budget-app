// rrd import
import { redirect } from "react-router-dom";

// helper function import
import { deleteItem } from "../utils/helper";

// IMPORT toast Library
import { toast } from "react-toastify";

export async function logoutAction() {
    // delete user
    deleteItem({ key: "userName" })
    // delete budgets
    deleteItem({ key: "budgets" })
    // delete expenses
    deleteItem({ key: "expenses" })


    toast.success("You've deleted your account!");

    // redirect to homepage
    return redirect("/");
}