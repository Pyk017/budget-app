import { CSSProperties } from "react";
import { budgetType } from "../pages/Dashboard"
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../utils/helper";

export interface styleInterface extends CSSProperties {
    "--accent": string
}

function BudgetItem({ budget } : { budget: budgetType}) {
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
    </div>
  )
}

export default BudgetItem
