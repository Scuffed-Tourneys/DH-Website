import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import get from 'axios';

const Users: NextPage = (props: any) => {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>Dailies</title>
				<meta content="Dailies" property="og:title" />
				<meta content="website" property="og:type" />
				<meta content="Users" property="og:description" />
				<meta content={`https://dailies.tk${router.asPath}`} property="og:url" />
				<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="grid gap-4 pl-16 pr-[1rem] mx-auto my-16 grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px] justify-items-center">
					{props.data.map((user: any, index: number) => {
						return (
							<Link key={index} href={`/users/${user.id}`} passHref>
								<div className="relative overflow-hidden h-[320px] text-center group cursor-pointer rounded-lg">
									<Image
										src={user.avatarUrl}
										className="object-cover transition-all duration-500 ease-in-out bg-white"
										alt=""
										width="225"
										height="320"
										placeholder="blur"
										blurDataURL={user.avatarUrl}
									/>
									<h1 className="absolute bg-black bg-opacity-70 py-5 -bottom-20 group-hover:bottom-0 group-hover:opacity-100 opacity-0 w-full transition-all duration-500 ease-out">
										<strong className="overflow-wrap ">{user.username}</strong>
									</h1>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="w-full text-center my-4">
					<Link
						href={`/users?page=${
							Number(router.query?.page) == 0 ? 0 : Number(router.query?.page) - 1
						}`}
					>
						<button
							disabled={Number(router.query?.page || 0) == 0 ? true : false}
							className="text-white border-2 border-white border-opacity-25 rounded-xl px-2 py-1 mx-2 transition duration-100 enabled:hover:border-blue-600 enabled:active:bg-blue-600 disabled:opacity-50 disabled:border-gray-600 disabled:cursor-not-allowed"
						>
							<p className="mx-1">{'<'}</p>
						</button>
					</Link>
					Page {router.query?.page || 1}
					<Link href={`/users?page=${Number(router.query?.page || 0) + 1}`}>
						<button
							disabled={props.data.lenght != 18 ? true : false}
							className="text-white border-2 border-white border-opacity-25 rounded-xl px-2 py-1 mx-2 transition duration-100 enabled:hover:border-blue-600 enabled:active:bg-blue-600 disabled:opacity-50 disabled:border-gray-600 disabled:cursor-not-allowed"
						>
							<p className="mx-1">{'>'}</p>
						</button>
					</Link>
				</div>
			</main>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const res = await get(
		`https://api.dailies.tk/users?offset=${Number(context.query?.page) * 18}&limit=18`
	);
	let data = res.data;
	if (!data) {
		data = [];
	}
	return {
		props: { data },
	};
};

export default Users;
