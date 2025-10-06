/**
 * Dashboard page that contains summarized data and graphs for overall expenses and income
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { useState, useEffect, use } from 'react';
import { BarChart } from '@/tremorComponents/BarChart';
import { LineChart } from '@/tremorComponents/LineChart';
import { ExpenseGroupedByDate, StringExpense } from '@/lib/db/expenses';

interface ChartData {
	date: string;
	total: number;
}

interface Totals {
	netTotal: number;
	weeklyTotal: number;
	monthlyTotal: number;
	yearlyTotal: number;
}

export default function page() {
	// State that manages whether to display expense/income data
	const [isExpense, setIsExpense] = useState<boolean>(true);
	const [isBarGraph, setIsBarGraph] = useState<boolean>(true);
	const [totals, setTotals] = useState<Totals>({
		netTotal: 0,
		weeklyTotal: 0,
		monthlyTotal: 0,
		yearlyTotal: 0,
	});
	const [selectedDateRange, setSelectedDateRange] = useState<string>('week');
	const [chartData, setChartData] = useState<ChartData[]>([]);

	// Gets the net total on initial mount
	useEffect(() => {
		// Gets the net total of all expenses and income
		async function getNetTotal() {
			try {
				// Fetches all the expenses from the db
				const res = await fetch('api/expenses/');

				if (!res.ok) throw new Error();

				const data: StringExpense[] = await res.json();

				// Calculates the net total by summing all the values
				const netTotal = data.reduce(
					(acc, expense) => acc + parseFloat(expense.amount),
					0
				);
				setTotals((prev) => ({
					...prev,
					netTotal: netTotal,
				}));
			} catch (error) {
				console.error(error);
				throw new Error();
			}
		}

		getNetTotal();
	}, []);

	/**
	 * Gets the expenses from the db and calculates the total of each date range any time a filter is changed
	 * Then groups and parses the data to be displayed by the graph
	 */
	useEffect(() => {
		/**
		 * Fetches the weekly, monthly, and yearly expense data from the db and only updates when isExpense is changed
		 * @param list A list of expenses grouped by date
		 */
		function calculateTotal(list: ExpenseGroupedByDate[]): number {
			if (list.length === 0) return 0;

			const total: number = list.reduce(
				(acc, group) => acc + group.totalAmount,
				0
			);
			return total;
		}

		/**
		 * Fetches expenses, calculates total and parses data
		 */
		async function getExpenses() {
			const today = new Date();
			let from: Date;
			let to: Date;

			try {
				// Fetches the filtered expenses from the db
				const res = await fetch(`/api/expenses/?isExpense=${isExpense}`);

				if (!res.ok) throw new Error();

				const data: ExpenseGroupedByDate[][] = await res.json();

				setTotals((prev) => ({
					...prev,
					weeklyTotal: calculateTotal(data[0]),
					monthlyTotal: calculateTotal(data[1]),
					yearlyTotal: calculateTotal(data[2]),
				}));

				// Depending on the selected date range further groups and parses the data into a type usable by the graphs
				if (selectedDateRange === 'week') {
					// Groups the dates in a week into mon, tue, wed, ... for displaying in the graph
					const chartData: ChartData[] = data[0].map((group) => ({
						date: new Date(group._id).toLocaleDateString('en-US', {
							weekday: 'short',
							timeZone: 'UTC',
						}),
						total: group.totalAmount,
					}));
					setChartData(chartData);
				} else if (selectedDateRange === 'month') {
					// Groups the dates in a month into weeks for displaying in the graph

					/**
					 * I just don't know how to type it because it can have any number of weeks
					 *
					 * week : {
					 *   1 : [ExpensesGroupedByDate],
					 *   2 : [ExpensesGroupedByDate],
					 *   3 : [ExpensesGroupedByDate],
					 *   ...
					 * }
					 */
					const weeks: any = {};

					data[1].forEach((group) => {
						// Gets the day of the month
						const date = new Date(group._id);
						const dayOfMonth = date.getDate();

						const firstDayOfMonth = new Date(
							date.getFullYear(),
							date.getMonth(),
							1
						);
						const firstDayOfWeek = firstDayOfMonth.getDay();

						// calculates the week number
						const weekNumber = Math.ceil((dayOfMonth + firstDayOfWeek) / 7);

						// Creates new a week category if it doesn't exist
						if (!weeks[weekNumber]) {
							weeks[weekNumber] = [];
						}

						// Adds the date to a week category
						weeks[weekNumber].push(group);
					});

					// Using the week categories parses the data into a usuable type for the graph to display
					const weekGroups: [string, ExpenseGroupedByDate[]][] =
						Object.entries(weeks);
					const chartData: ChartData[] = weekGroups.map(
						([weekNumber, expenses]) => ({
							date: `Week ${weekNumber}`,
							total: calculateTotal(expenses),
						})
					);

					setChartData(chartData);
				} else {
					// Groups the dates in a year into months for displaying in the graph
					const months: any = {};
					data[2].forEach(({ _id, totalAmount }) => {
						// Gets the key as the month
						const key = new Date(_id).toLocaleDateString('en-US', {
							month: 'short',
						});

						// Adds the total amount to it's group
						if (!months[key]) months[key] = 0;
						months[key] = months[key] + totalAmount;
					});

					// Parses the grouped months into a usable type for the graph
					const monthGroups: [string, number][] = Object.entries(months);
					const chartData: ChartData[] = monthGroups.map(([month, total]) => ({
						date: month,
						total: total,
					}));

					setChartData(chartData);
				}
			} catch (error) {
				console.error(error);
				throw new Error('Failed to fetch filtered expenses');
			}
		}

		getExpenses();
	}, [isExpense, selectedDateRange]);

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

	/**
	 * Handles when a date range is selected and changes the filter
	 */
	function handleDateRangeChange(event: any): void {
		const selectedDateRange: string = event.currentTarget.name;

		if (selectedDateRange === 'week') {
			setSelectedDateRange(selectedDateRange);
		} else if (selectedDateRange === 'month') {
			setSelectedDateRange(selectedDateRange);
		} else if (selectedDateRange === 'year') {
			setSelectedDateRange(selectedDateRange);
		}
	}

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
				<strong className="text-2xl mt-4 mb-8">
					${totals.netTotal.toFixed(2)}
				</strong>
			</div>
			<div
				className={`block bg-white ${
					chartData.length === 0 ? 'centered-flex p-4' : 'py-4 pr-4'
				}`}
			>
				{chartData.length === 0 ? (
					<div>No data to display</div>
				) : isBarGraph ? (
					<BarChart
						className="h-80"
						data={chartData}
						index="date"
						categories={['total']}
					/>
				) : (
					<LineChart
						className="h-80"
						data={chartData}
						index="date"
						categories={['total']}
					/>
				)}
			</div>
			<div className="flex gap-4">
				<button
					className={`block centered-flex flex-col w-full p-4 gap-2 ${
						selectedDateRange === 'week'
							? 'bg-myGreen text-white'
							: 'bg-white hover:bg-myLightGray active:bg-myGray'
					}`}
					name="week"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Week</p>
					<strong className="text-sm">${totals.weeklyTotal.toFixed(2)}</strong>
				</button>
				<button
					className={`block centered-flex flex-col w-full p-4 gap-2 ${
						selectedDateRange === 'month'
							? 'bg-myGreen text-white'
							: 'bg-white hover:bg-myLightGray active:bg-myGray'
					}`}
					name="month"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Month</p>
					<strong className="text-sm">${totals.monthlyTotal.toFixed(2)}</strong>
				</button>
				<button
					className={`block centered-flex flex-col w-full p-4 gap-2 ${
						selectedDateRange === 'year'
							? 'bg-myGreen text-white'
							: 'bg-white hover:bg-myLightGray active:bg-myGray'
					}`}
					name="year"
					onClick={handleDateRangeChange}
				>
					<p className="text-xs">Year</p>
					<strong className="text-sm">${totals.yearlyTotal.toFixed(2)}</strong>
				</button>
			</div>
		</div>
	);
}
