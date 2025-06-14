import './globals.css';

export const metadata = {
	title: 'Exp Share',
	description: 'Track expenses',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
