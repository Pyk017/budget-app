import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";

// IMPORT HELPER FUNCTION
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../utils/helper";
//components import
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// types definition
export  type dashboardLoaderType = {
    userName: string
    budgets: budgetType[], 
    expenses: expenseType[]
}

export type budgetType = {
    id: string,
    name: string, 
    amount: string,
    createdAt: number, 
    color: string,
}

export type expenseType = {
    id: string, 
    name: string, 
    amount: string, 
    createdAt: number, 
    budgetId: string,
}

export interface BudgetTypeInterface {
    budgets: budgetType[]
}


// LOADER FUNCTION 
export const dashboardLoader = (): dashboardLoaderType => {
    const userName: string = fetchData("userName");
    const budgets: budgetType[] = fetchData("budgets");
    const expenses: expenseType[] = fetchData("expenses")
    return { userName, budgets, expenses } 
}

// actions
export async function dashboardAction({ request }: ActionFunctionArgs) {
    await wait();

    const data = await request?.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        } catch (e) {
            throw new Error("There is a problem creating your account. "+ e)
        }
    }

    if (_action === "createBudget") {
        try {
            // create budget
            createBudget({
                name: values?.newBudget as string, 
                amount: values?.newBudgetAmount as string,
            });
            return toast.success("Budget Created !")
        } catch(e) {
            throw new Error("There is a problem creating your budget. " + e);
        }
    }

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

function Dashboard() {
    const { userName, budgets, expenses } = useLoaderData() as dashboardLoaderType;

  return (
    <>
        {userName && Object.keys(userName)?.length > 0 ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets?.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                {
                                    budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget as budgetType} />
                                    ))
                                }
                                </div>
                                {expenses && expenses?.length > 0 && (
                                    <div className="grid-sm">
                                        <h2>Recent Expenses</h2>
                                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8) } />
                                            {
                                                expenses.length > 8 && (
                                                    <Link to="/expenses" className="btn btn--dark">
                                                        View All Expenses
                                                    </Link>
                                                )
                                            }
                                    </div>
                                )}
                            </div>
                        ): (
                            <div className="grid-sm">
                                <p>Personal Budgetting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
                </div>
            </div>
        ): (
            <Intro />
        )}
    </>
  )
}

export default Dashboard
