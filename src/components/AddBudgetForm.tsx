import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { MutableRefObject, useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom'

function AddBudgetForm() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef() as MutableRefObject<HTMLFormElement>;
    const focusRef = useRef() as MutableRefObject<HTMLInputElement>;


    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current?.focus();
        }
    }, [isSubmitting])

  return (
    <div className='form-wrapper'>
        <h2 className="h3"> Create Budget </h2>
        <fetcher.Form
            method="post"
            className='grid-sm'
            ref={formRef}
        >
            <div className="grid-xs">
                <label htmlFor="newBudget"> Budget Name</label>
                <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required ref={focusRef} />
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" name="newBudgetAmount" id="newBudgetAmount" step="0.01" placeholder="e.g., $330" inputMode='decimal' required/>
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                {
                    isSubmitting ? (
                        <span>Submitting ...</span>
                    ): (
                        <>
                            <span>Create Budget</span>
                            <CurrencyRupeeIcon width={20} />
                        </>
                    )
                }
                
            </button>
        </fetcher.Form>
      
    </div>
  )
}

export default AddBudgetForm
