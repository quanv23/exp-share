import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	return (
		<div>
			<Link href={'/Dashboard'}>Dashboard</Link>
			<Link href={'/Categories'}>Categories</Link>
			<Link href={'/Expenses'}>Expenses</Link>
		</div>
	);
}
