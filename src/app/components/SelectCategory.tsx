import { StringCategory } from '@/lib/db/categories';

/**
 * Represents the props for this component
 */
export interface Props {
	/**
	 * List of all categories from the db with string values
	 */
	categories: StringCategory[];
	/**
	 * The value of the input field
	 */
	value: string;
	/**
	 * Width of <select> as a string in tailwind format (Ex. w-4)
	 */
	width: String;
	/**
	 * Function that runs when changes to the input field occur
	 */
	onChangeFunction: (event: EventChange) => void;
}

/**
 * Represents the type for an event change in the form
 */
type EventChange =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

/**
 * Dropdown for selecting from a list of all categories from the db
 * @param props Properties of the component
 */
export default function SelectCategory(props: Props) {
	const { categories, value, width, onChangeFunction } = props;

	// Maps category name and ID to dropdown options
	// Such that the names are displayed, but when selected the IDs are saved
	const categoryElements: React.ReactNode[] = categories.map((category) => (
		<option key={category.id} value={category.id}>
			{category.name}
		</option>
	));

	return (
		<select
			name='category'
			value={value}
			onChange={onChangeFunction}
			className={`input-field ${width}`}
		>
			<option value=''>Category</option>
			{categoryElements}
		</select>
	);
}
