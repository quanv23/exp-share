'use client';

import React from 'react';
import { DateRange, DateRangePicker } from '@/tremorComponents/DatePicker';

export const DateRangePickerYearNavigationExample = () => {
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
		undefined
	);
	return (
		<div className='flex items-center'>
			<DateRangePicker
				enableYearNavigation
				value={dateRange}
				onChange={setDateRange}
				className='w-11.5'
			/>
			<p className='bg-gray-100 p-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300'>
				Selected Range:{' '}
				{dateRange
					? `${dateRange.from?.toLocaleDateString()} – ${
							dateRange.to?.toLocaleDateString() ?? ''
					  }`
					: 'None'}
			</p>
		</div>
	);
};
