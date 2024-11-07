// rrd imports
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
// utils import 
import { deleteItem, fetchData, wait } from "../utils/helper";
// type import from dashboard 
import { expenseType } from "./Dashboard";
// component imports 
import Table from "../components/Table";
import { toast } from "react-toastify";

interface expensesLoaderInterface {
    expenses: expenseType[]
}

// expenses loader
export const expensesLoader = async (): Promise<expensesLoaderInterface> => {
    const expenses = fetchData("expenses");
    return { expenses };
}

// expenses action 
export const expensesAction = async ({ request }: ActionFunctionArgs) => {
    await wait();

    const data = await request?.formData();
    const {_action, ...values} = Object.fromEntries(data);


    if (_action ===  "deleteExpense") {
        try {
            // delete expense 
            deleteItem({
                key: "expenses", 
                id: values.expenseId as string,
              })
              return toast.success(`Expense deleted!`) 
        } catch(e) {
            throw new Error("There is a problem deleting your expense. " + e);
        }
    }
}

function ExpensesPage() {
    const { expenses } = useLoaderData() as expensesLoaderInterface;
  return (
    <div className="grid-lg">
        <h2>All Expenses</h2>
        { expenses && expenses?.length > 0 ? (
            <>
                <h2>Recent Expenses <small>({expenses?.length} total)</small></h2>
                <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
            </>
        ): (
            <p>No Expenses to show.</p>
        )}
    </div>
  )
}

export default ExpensesPage
