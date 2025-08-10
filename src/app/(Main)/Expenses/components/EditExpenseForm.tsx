/**
 * React form component that appears as a modal for editing one expense at a time
 * @module
 */

import { UserInputExpense } from '@/lib/db/expenses';

/**
 * Represents the props of the edit form
 */
export interface Props {
	editExpenseFunction: (newExpense: UserInputExpense) => Promise<void>;
}

export default function EditExpenseForm() {
	return <div>EditExpenseForm</div>;
}
