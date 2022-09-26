import get from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Showcase from '../components/showcase';

const Home: NextPage = (props: any) => {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>Dailies</title>
				<meta content="Dailies" property="og:title" />
				<meta content="website" property="og:type" />
				<meta content="Daily pogger photos!" property="og:description" />
				<meta content="https://dailies.tk/" property="og:url" />
				<meta content={props.data[0].images[0].url} property="og:image" />
				<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<article className="mt-16">
					<Showcase items={props.data} />
				</article>
				<div className="w-full text-center my-4">
					<Link
						href={`/?page=${
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
					<Link href={`/?page=${Number(router.query?.page || 0) + 1}`}>
						<button
							disabled={false}
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
		`https://api.dailies.tk/collections?offset=${Number(context.query?.page) * 18}&limit=18`
	);
	const data = res.data;
	return {
		props: { data },
	};
};

export default Home;
