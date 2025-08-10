/**
 * React component that contains the backdrop for a form to keep consistent styling throughout forms
 * @module
 */

export interface Props {
	submitFormFunction: () => void;
	children: React.ReactNode;
}

export default function Form(props: Props) {
	const { submitFormFunction, children } = props;

	return (
		<form
			onSubmit={submitFormFunction}
			className='centered-flex block flex-col w-full bg-white p-8 space-y-6'
		>
			{children}
		</form>
	);
}
