/**
 * React component that allows the user to select 1 of 8 different colours
 * that align with the options from the tremor component
 * @module
 */
'use client';

export interface Props {
	/**
	 * The currently selected colour
	 */
	selectedColour: string;
	/**
	 * Callback function that handles when a colour is selected
	 */
	handleColourSelected: (colour: string) => void;
}

export interface colourChart {
	name: string;
	value: string;
}

export default function ColourSelector(props: Props) {
	const { selectedColour, handleColourSelected } = props;

	// The available colours to select from
	const colours: colourChart[] = [
		{
			name: 'blue',
			value: 'bg-blue-500',
		},
		{
			name: 'emerald',
			value: 'bg-emerald-500',
		},
		{
			name: 'violet',
			value: 'bg-violet-500',
		},
		{
			name: 'amber',
			value: 'bg-amber-500',
		},
		{
			name: 'cyan',
			value: 'bg-cyan-500',
		},
		{
			name: 'pink',
			value: 'bg-pink-500',
		},
		{
			name: 'lime',
			value: 'bg-lime-500',
		},
		{
			name: 'fuchsia',
			value: 'bg-fuchsia-500',
		},
	];

	return (
		<div className="grid grid-cols-4 gap-6 w-full bg-myLightGray rounded-md p-4">
			{colours.map((colour, index) => (
				<div key={index} className="centered-flex">
					<button
						type="button"
						onClick={() => handleColourSelected(colour.name)}
						className={`w-6 h-6 rounded-full ${colour.value} ${
							selectedColour === colour.name ? 'border-2' : ''
						}`}
					></button>
				</div>
			))}
		</div>
	);
}
