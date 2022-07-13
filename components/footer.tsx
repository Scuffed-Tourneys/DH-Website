import Link from 'next/link';

const Footer = () => {
	return (
		<div className="h-16">
			<footer className="fixed bottom-0 left-0 w-screen bg-gray-800 text-gray-300">
				<div className="flex flex-auto flex-row text-center">
					<div className="max-w-3xl mx-auto p-5">
						© {new Date().getFullYear()} Dailies
					</div>
					<div className="max-w-3xl mx-auto p-5">
						<Link href="/privacy" passHref>
							<h1 className="cursor-pointer">Privacy Policy</h1>
						</Link>
						<Link href="/tos" passHref>
							<h1 className="cursor-pointer">Terms of Service</h1>
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
