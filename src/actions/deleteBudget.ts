// toast library import 
import { toast } from "react-toastify";
// utilities imported
import { deleteItem, getAllMatchingItems } from "../utils/helper"
// pages imported
import { expenseType } from "../pages/Dashboard";
// rrd imports
import { ActionFunctionArgs, redirect } from "react-router-dom";

export const deleteBudget = ({ params }: ActionFunctionArgs) => {
    try {
        deleteItem({
            key: "budgets", 
            id: params.id ?? "",
        })

        const associatedExpenses = getAllMatchingItems({
            category: "expenses", 
            key: "budgetId", 
            value: params.id ?? "",
        });

        associatedExpenses.forEach((expense: expenseType) => {
            deleteItem({
                key: "expenses", 
                id: expense.id,
            });
        })
        toast.success("Budget deleted successfully!")
    } catch (e) {
        throw new Error("There was an error deleting your budget! " + e);
    }

    return redirect("/")
}