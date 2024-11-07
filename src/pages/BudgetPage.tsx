// RRD imports
import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
// util imports
import { createExpense, deleteItem, getAllMatchingItems, wait } from "../utils/helper"
// budget type imported
import { budgetType, expenseType } from "./Dashboard";
// import components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { styleInterface } from "../components/BudgetItem";
//library import
import { toast } from "react-toastify";


interface budgetLoaderInterface {
    budget: budgetType
    expenses: expenseType[]
}

// loader
export async function budgetLoader({ params }: LoaderFunctionArgs) {
    const budget = await getAllMatchingItems({
        category: "budgets", 
        key: "id", 
        value: params.id ?? "", 
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses", 
        key: "budgetId", 
        value: params.id ?? "", 
    });

    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exists!")
    }

    return { budget, expenses };
}

// action (delete expense)
// expenses action 
export const budgetAction = async ({ request }: ActionFunctionArgs) => {
    await wait();

    const data = await request?.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if (_action ===  "createExpense") {
        try {
            // create expense 
            createExpense({
                name: values?.newExpense as string,
                amount: values?.newExpenseAmount as string,
                budgetId: values?.newExpenseBudget as string
              })
              return toast.success(`Expense ${values.newExpense} created!`)
        } catch(e) {
            throw new Error("There is a problem creating your expense. " + e);
        }
    }

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


function BudgetPage() {
    const { budget, expenses } = useLoaderData() as budgetLoaderInterface;
    console.log(budget);
  return (
    <div className="grid-lg" style={{ "--accent": budget.color } as styleInterface}> 
        <h2 className="h2">
            <span className="accent">{ budget.name }</span> Overview
        </h2>
        <div className="flex-lg">
            <BudgetItem budget={budget} />
            <AddExpenseForm budgets={[budget]} />
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2><span className="accent">{ budget.name }</span> Expenses</h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )
        }
        
    </div>
  )
}

export default BudgetPage
