/**
 * Dashboard page that contains summarized data and graphs for overall expenses and income
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { useState } from 'react';
import { BarChart } from '@/tremorComponents/BarChart';
import { LineChart } from '@/tremorComponents/LineChart';

export default function page() {
	// State that manages whether to display expense/income data
	const [isExpense, setIsExpense] = useState(true);
	const [isBarGraph, setIsBarGraph] = useState(true);
	const [dateRange, setDateRange] = useState();

	/**
	 * Handles when the option button is toggled and sets the state  to make the graph show expense data
	 */
	function handleShowExpense(): void {
		setIsExpense(true);
	}

	/**
	 * Handles when the option button is toggled and sets the state to income to make the graph show income data
	 */
	function handleShowIncome(): void {
		setIsExpense(false);
	}

	/**
	 * Handles when the graph type is toggled between bar and line
	 */
	function toggleGraphDisplay(): void {
		setIsBarGraph((prev) => !prev);
	}

	function handleDateRangeChange(event: any): void {
		console.log(event.currentTarget.name);
	}

	const chartdata = [
		{
			date: 'Mon',
			SolarPanels: 104,
		},
		{
			date: 'Tue',
			SolarPanels: 120,
		},
		{
			date: 'Wed',
			SolarPanels: 160,
		},
		{
			date: 'Thu',
			SolarPanels: 80,
		},
		{
			date: 'Fri',
			SolarPanels: 96,
		},
		{
			date: 'Sat',
			SolarPanels: 200,
		},
		{
			date: 'Sun',
			SolarPanels: 170,
		},
	];

	return (
		<div className="flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4">
			<div className="flex justify-between">
				<ExpenseIncomeButton
					showExpense={isExpense}
					handleShowExpense={handleShowExpense}
					handleShowIncome={handleShowIncome}
				/>
				<button className="small-btn bg-white" onClick={toggleGraphDisplay}>
					{isBarGraph ? 'Bar' : 'Line'}
				</button>
			</div>
			<div className="centered-flex flex-col">
				<p className="text-myDarkGray my-2">Net Total:</p>
				<strong className="text-2xl mt-4 mb-8">$XXXX.XX</strong>
			</div>
			<div className="block bg-white py-4 pr-4">
				{isBarGraph ? (
					<BarChart
						className="h-80"
						data={chartdata}
						index="date"
						categories={['SolarPanels']}
					/>
				) : (
					<LineChart
						className="h-80"
						data={chartdata}
						index="date"
						categories={['SolarPanels']}
					/>
				)}
			</div>
			<div className="flex gap-4">
				<button
					className="block centered-flex flex-col w-full p-4 gap-2 bg-myGreen text-white hover:bg-myLightGray active:bg-myGray"
					name="week"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Week</p>
					<strong className="text-sm">$XXXX.XX</strong>
				</button>
				<button
					className="block centered-flex flex-col w-full p-4 gap-2 bg-white hover:bg-myLightGray active:bg-myGray"
					name="month"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Month</p>
					<strong className="text-sm">$XXXX.XX</strong>
				</button>
				<button
					className="block centered-flex flex-col w-full p-4 gap-2 bg-white hover:bg-myLightGray active:bg-myGray"
					name="year"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Year</p>
					<strong className="text-sm">$XXXX.XX</strong>
				</button>
			</div>
		</div>
	);
}
