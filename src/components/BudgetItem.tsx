import { CSSProperties } from "react";
import { budgetType } from "../pages/Dashboard"
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../utils/helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

export interface styleInterface extends CSSProperties {
    "--accent": string
}

function BudgetItem({ budget, showDelete = false } : { budget: budgetType, showDelete: boolean }) {
    const { id, name, amount, color } = budget  ;
    const spent = calculateSpentByBudget(id);

  return (
    <div 
        className="budget" 
        style={{ "--accent": color } as styleInterface}
    >
        <div className="progress-text">
            <h3>{ name }</h3>
            <p>{ formatCurrency(+amount) }</p>
        </div>
        <progress max={ amount } value={spent}>
            { formatPercentage(spent / +amount) }
        </progress>
        <div className="progress-text">
            <small>{`${formatCurrency(spent)} spent`}</small>
            <small>{formatCurrency(+amount - spent)} remaining</small>
        </div>
        { showDelete ? (
            <div className="flex-sm">
                <Form
                    method="post"
                    action="delete"
                    onSubmit={(event) => {
                        if (!confirm("Are you sure you want to permanently delete this budget?")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button className="btn" type="submit">
                        <span>Delete Budget</span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            </div>
        ): (    
            <div className="flex-sm">
                <Link to={`/budget/${id}`} className="btn">
                    <span>View Details</span>
                    <BanknotesIcon width={20} />
                </Link>
            </div>
        )}
    </div>
  )
}

export default BudgetItem
