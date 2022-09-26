import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="h-16">
			<footer className="bg-gray-800 text-gray-300">
				<footer className="flex flex-auto flex-row text-center">
					<footer className="max-w-3xl mx-auto p-5">
						© {new Date().getFullYear()} Scuffed Tourneys
					</footer>
					<footer className="max-w-3xl mx-auto p-5">
						<Link href="/privacy" passHref>
							<h1 className="cursor-pointer">Privacy Policy</h1>
						</Link>
						<Link href="/tos" passHref>
							<h1 className="cursor-pointer">Terms of Service</h1>
						</Link>
					</footer>
				</footer>
			</footer>
		</footer>
	);
};

export default Footer;
