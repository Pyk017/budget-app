// import routes
import { Link, useFetcher } from 'react-router-dom';
// import type 
import { expenseType } from '../pages/Dashboard'
// import utilities function from util folder
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../utils/helper'
// importing icons
import { TrashIcon } from '@heroicons/react/24/solid';
// interface for style attribute
import { styleInterface } from './BudgetItem';

export default function ExpenseItem({ expense, showBudget }: { expense: expenseType, showBudget: boolean }) {
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budgets", 
        key: "id", 
        value: expense.budgetId
    })[0];

    console.log(budget);

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(+expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      { showBudget && (
        <>
            <td>
                <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color } as styleInterface}>
                    {budget.name}
                </Link>
            </td>
        </>
      )}
    <td>
        <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button type="submit" className='btn btn--warning' aria-label={`Delete ${expense.name} Expense`}>
                <TrashIcon width={20} />
            </button>
        </fetcher.Form>
    </td>
    </>
  )
}
