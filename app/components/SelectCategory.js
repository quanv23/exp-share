export default function SelectCategory(props) {
	const { categories, value, onChange } = props;

	// Maps category name and id to dropdown options
	const categoryElements = categories.map((category) => (
		<option key={category.id} value={category.id}>
			{category.name}
		</option>
	));

	return (
		<select name='category' value={value} onChange={onChange}>
			<option value=''>Select a category</option>
			{categoryElements}
		</select>
	);
}
