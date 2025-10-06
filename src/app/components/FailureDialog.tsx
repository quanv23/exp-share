/**
 * A react component that's used to display successful actions
 * @module
 */

import { RiErrorWarningLine } from '@remixicon/react';

export default function FailureDialog() {
	return (
		<div className="centered-flex flex-col rounded-xl shadow-md gap-4 bg-white p-6 border-2 border-myRed w-50">
			<RiErrorWarningLine size={50} color="#ff5757" />
			<p>Action Failed</p>
		</div>
	);
}
