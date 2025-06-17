import ExpenseCard from '@/app/(Main)/components/ExpenseCard';
import { getAllExpenses, editExpense } from '@/lib/db/expenses';
import { getAllCategories } from '@/lib/db/categories';

export default async function Expenses() {
	const expenses = await getAllExpenses(); // Gets all expenses
	const categories = await getAllCategories(); // Gets all categories for Edit modal

	// Maps the expenses to client Card components
	const expenseElements = expenses.map((expense) => (
		<ExpenseCard
			key={expense.id}
			{...expense}
			categories={categories}
			editExpenseAction={editExpense}
		/>
	));

	return <div>{expenseElements}</div>;
}
