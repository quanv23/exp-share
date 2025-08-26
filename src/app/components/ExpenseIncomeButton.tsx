/**
 * A react component that contains a button that toggles between expense and income
 * @module
 */

/**
 * Represents the props for this component
 */
export interface Prop {
	/**
	 * State that determines whether to show expenses or income
	 */
	showExpense: Boolean;
	/**
	 * Callback function that updates the state to now show expenses
	 */
	handleShowExpense: () => void;
	/**
	 * Callback function that updates the state to now show income
	 */
	handleShowIncome: () => void;
}

export default function ExpenseIncomeButton(props: Prop) {
	const { showExpense, handleShowExpense, handleShowIncome } = props;

	return (
		<div className='flex bg-white rounded-3xl shadow-md'>
			<button
				className={`min-w-[100px] h-[30px] px-6 rounded-3xl text-xs ${
					showExpense ? 'bg-myGreen text-white' : 'bg-white'
				}`}
				onClick={handleShowExpense}
			>
				Expense
			</button>
			<button
				className={`min-w-[100px] h-[30px] px-6 rounded-3xl text-xs ${
					showExpense ? 'bg-white' : 'bg-myGreen text-white'
				}`}
				onClick={handleShowIncome}
			>
				Income
			</button>
		</div>
	);
}
