// RANDOM waiting function
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 2000));

// GENERATE RANDOM COLOR
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// LOCAL STORAGE
export const fetchData = (key: string) => {
    return JSON.parse(localStorage.getItem(key) ?? "[]")
}

// get all matching items from local storage
export const getAllMatchingItems = ({ category, key, value }: { category: string, key: string, value: string }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item: { [x: string]: string; }) => item[key] === value);
}

// deleting items from local storage
export const deleteItem = ({key, id}: {key: string, id: string}) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item: { id: string }) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// create budget
export const createBudget = ({ name, amount }: { name: string, amount: string }) => {
    const newItem = {
        id: crypto.randomUUID(), 
        name: name, 
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudget = fetchData("budgets") ?? [];

    return localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]));
}

// create expense 
export const createExpense = ({ name, amount, budgetId }: { name: string, amount: string, budgetId: string }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
      }
      const existingExpenses = fetchData("expenses") ?? [];

      return localStorage.setItem("expenses",
        JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId: string) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc: number, expense: { budgetId: string; amount: number; }) => {
      // check if expense.id === budgetId I passed in
      if (expense.budgetId !== budgetId) return acc
  
      // add the current amount to my total
      return acc += expense.amount
    }, 0)
    return budgetSpent;
  }
  

//  FORMATTING

// Formatting 
export const formatDateToLocaleString = (epoch: number) => {
    return new Date(epoch).toLocaleDateString();
}


// Formatting percentages
export const formatPercentage = (amt: number) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    })
  }
  
  // Format currency
  export const formatCurrency = (amt: number) => {
    return amt.toLocaleString(undefined, {
      style: "currency",
      currency: "INR"
    })
  }