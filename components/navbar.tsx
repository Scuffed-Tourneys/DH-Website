import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

export const navItems: {
	href: string;
	label: string;
}[] = [
	{
		href: '/',
		label: 'Home',
	},
	{
		href: '/users',
		label: 'Users',
	},
	{
		href: '/upload',
		label: 'Upload',
	},
];

const Navbar = () => {
	const router = useRouter();
	const { data, error } = useSWR('https://api.dailies.tk/', fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;
	if (data?.id) {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-purple-700">
				<div className="max-w-6xl mx-auto p-6 text-white flex justify-between items-center">
					<div className="italic text-2xl">
						<Link href="/" key="/">
							<a className="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
								<strong>DAILIES</strong>
							</a>
						</Link>
					</div>
					<nav className="hidden md:block">
						{navItems.map((link) => (
							<Link href={link.href} key={link.href}>
								<a className="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
									{link.label}
								</a>
							</Link>
						))}
					</nav>
					<div className="hidden md:block">
						<Image
							className="rounded-full cursor-pointer"
							src={data.avatarUrl}
							alt=""
							width="60"
							height="60"
						/>
					</div>
				</div>
			</header>
		);
	} else {
		return (
			<header className="bg-gradient-to-r from-blue-600 to-purple-700">
				<div className="max-w-6xl mx-auto p-6 text-white flex justify-between items-center">
					<div className="italic text-2xl">
						<Link href="/" key="/">
							<a className="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
								<strong>DAILIES</strong>
							</a>
						</Link>
					</div>
					<nav className="hidden md:block">
						{navItems.map((link) => (
							<Link href={link.href} key={link.href}>
								<a className="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
									{link.label}
								</a>
							</Link>
						))}
					</nav>
					<div className="hidden md:block">
						<Link
							href={`https://api.dailies.tk/login/discord?url=${router.asPath}`}
							key="/login"
						>
							<a className="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
								Log <strong>In</strong>
							</a>
						</Link>
					</div>
				</div>
			</header>
		);
	}
};

export default Navbar;
