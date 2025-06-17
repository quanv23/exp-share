/**
 * <Summary> Keeps track of commonly used functions when making forms
 */

// Handles input field changes and updates the state
function handleChange(event, setFormData) {
	const { name, value } = event.target;
	setFormData((prevData) => ({
		...prevData,
		[name]: value,
	}));
}

// Handles when a form is submitted and TODO
function handleSubmit(event, action, state) {
	event.preventDefault();
	action(state);
}
