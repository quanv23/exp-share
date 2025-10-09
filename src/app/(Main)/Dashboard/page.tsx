/**
 * Dashboard page that contains summarized data and graphs for overall expenses and income
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { useState, useEffect } from 'react';
import { BarChart } from '@/tremorComponents/BarChart';
import { LineChart } from '@/tremorComponents/LineChart';
import { ExpenseGroupedByDate } from '@/lib/db/expenses';

interface ChartData {
	date: string;
	total: number;
}

interface Totals {
	weeklyNetTotal: number;
	monthlyNetTotal: number;
	yearlyNetTotal: number;
	weeklyTotal: number;
	monthlyTotal: number;
	yearlyTotal: number;
}

export default function Page() {
	// State that manages whether to display expense/income data
	const [isExpense, setIsExpense] = useState<boolean>(true);
	const [isBarGraph, setIsBarGraph] = useState<boolean>(true);
	const [totals, setTotals] = useState<Totals>({
		weeklyNetTotal: 0,
		monthlyNetTotal: 0,
		yearlyNetTotal: 0,
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
				const res = await fetch('api/expenses/?isExpense=null');

				if (!res.ok) throw new Error();

				const data: ExpenseGroupedByDate[][] = await res.json();

				setTotals((prev) => ({
					...prev,
					weeklyNetTotal: data[0].length > 0 ? data[0][0].totalAmount : 0,
					monthlyNetTotal: data[1].length > 0 ? data[1][0].totalAmount : 0,
					yearlyNetTotal: data[2].length > 0 ? data[2][0].totalAmount : 0,
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
					const chartData: ChartData[] = [
						{
							date: 'Sun',
							total: 0,
						},
						{
							date: 'Mon',
							total: 0,
						},
						{
							date: 'Tue',
							total: 0,
						},
						{
							date: 'Wed',
							total: 0,
						},
						{
							date: 'Thu',
							total: 0,
						},
						{
							date: 'Fri',
							total: 0,
						},
						{
							date: 'Sat',
							total: 0,
						},
					];

					// Fills in the total for the chart data
					data[0].forEach((group) => {
						const date = new Date(group._id).toLocaleDateString('en-US', {
							weekday: 'short',
						});
						const item: ChartData | undefined = chartData.find(
							(obj) => obj.date === date
						);

						// Chart data contains all possible fields so it will always be found
						item!.total = group.totalAmount;
					});

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
						const date: Date = new Date(group._id);
						const dayOfMonth: number = date.getDate();

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
					const chartData: ChartData[] = [
						{
							date: 'Week 1',
							total: 0,
						},
						{
							date: 'Week 2',
							total: 0,
						},
						{
							date: 'Week 3',
							total: 0,
						},
						{
							date: 'Week 4',
							total: 0,
						},
						{
							date: 'Week 5',
							total: 0,
						},
					];

					// Using the week categories parses updates the chart data info
					const weekGroups: [string, ExpenseGroupedByDate[]][] =
						Object.entries(weeks);

					// Matches by week name and fills in the total data
					weekGroups.forEach(([weekNumber, expeneses]) => {
						const item: ChartData | undefined = chartData.find(
							(obj) => obj.date === `Week ${weekNumber}`
						);
						item!.total = calculateTotal(expeneses);
					});

					setChartData(chartData);
				} else {
					// Groups the dates in a year into months for displaying in the graph
					const months: any = {};
					data[2].forEach(({ _id, totalAmount }) => {
						// Gets the key as the month
						const key: string = new Date(_id).toLocaleDateString('en-US', {
							month: 'short',
						});

						// Adds the total amount to it's group
						if (!months[key]) months[key] = 0;
						months[key] = months[key] + totalAmount;
					});

					const chartData: ChartData[] = [
						{
							date: 'Jan',
							total: 0,
						},
						{
							date: 'Feb',
							total: 0,
						},
						{
							date: 'Mar',
							total: 0,
						},
						{
							date: 'Apr',
							total: 0,
						},
						{
							date: 'May',
							total: 0,
						},
						{
							date: 'Jun',
							total: 0,
						},
						{
							date: 'Jul',
							total: 0,
						},
						{
							date: 'Aug',
							total: 0,
						},
						{
							date: 'Sep',
							total: 0,
						},
						{
							date: 'Oct',
							total: 0,
						},
						{
							date: 'Nov',
							total: 0,
						},
						{
							date: 'Dec',
							total: 0,
						},
					];

					// updates the chart data info with the grouped info
					const monthGroups: [string, number][] = Object.entries(months);
					monthGroups.forEach(([month, total]) => {
						const item: ChartData | undefined = chartData.find(
							(obj) => obj.date === month
						);
						item!.total = total;
					});

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
				<p className="text-myDarkGray my-2">
					{selectedDateRange === 'week'
						? 'Weekly'
						: selectedDateRange === 'month'
						? 'Montly'
						: 'Yearly'}{' '}
					Net Total:
				</p>
				<strong className="text-2xl mt-4 mb-8">
					$
					{selectedDateRange === 'week'
						? totals.weeklyNetTotal.toFixed(2)
						: selectedDateRange === 'month'
						? totals.monthlyNetTotal.toFixed(2)
						: totals.yearlyNetTotal.toFixed(2)}
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
						showLegend={false}
						showTooltip={false}
					/>
				) : (
					<LineChart
						className="h-80"
						data={chartData}
						index="date"
						categories={['total']}
						showLegend={false}
						showTooltip={false}
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
					<strong
						className={`text-sm ${
							selectedDateRange === 'week'
								? ''
								: isExpense
								? 'text-myRed'
								: 'text-myGreen'
						}`}
					>
						${Math.abs(totals.weeklyTotal).toFixed(2)}
					</strong>
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
					<strong
						className={`text-sm ${
							selectedDateRange === 'month'
								? ''
								: isExpense
								? 'text-myRed'
								: 'text-myGreen'
						}`}
					>
						${Math.abs(totals.monthlyTotal).toFixed(2)}
					</strong>
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
					<strong
						className={`text-sm ${
							selectedDateRange === 'year'
								? ''
								: isExpense
								? 'text-myRed'
								: 'text-myGreen'
						}`}
					>
						${Math.abs(totals.yearlyTotal).toFixed(2)}
					</strong>
				</button>
			</div>
		</div>
	);
}
