import { expenseType } from '../pages/Dashboard'
import ExpenseItem from './ExpenseItem'

export default function Table({ expenses, showBudget = true }: { expenses: expenseType[]; showBudget: boolean }) {
  return (
    <div className='table'>
      <table>
        <thead>
            <tr>
                {
                    ["Name", "Amount", "Date", showBudget ? "Budget": "", ""].map((i, index) => (
                        <th key={index}>{i}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                expenses.map(expense => (
                    <tr key={expense.id}>
                        {/* {expense.name} */}
                        <ExpenseItem expense={expense} showBudget={showBudget} />
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  )
}
