/**
 * A react component that's used to display successful actions
 * @module
 */

import { RiCheckboxCircleLine } from '@remixicon/react';

export default function SuccessDialog() {
	return (
		<div className="centered-flex flex-col rounded-xl shadow-md gap-4 bg-white p-6 border-2 border-myGreen w-50">
			<RiCheckboxCircleLine size={50} color="#33ba77" />
			<p>Action Successful</p>
		</div>
	);
}
