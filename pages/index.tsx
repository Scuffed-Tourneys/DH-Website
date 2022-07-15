import get from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Showcase from '../components/showcase';

const Home: NextPage = (props: any) => {
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
				<Showcase items={props.data} />
			</main>

			<footer></footer>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const res = await get(
		`https://api.dailies.tk/collections?offset=${
			Number(context.params?.page) * 20 || 0
		}&limit=20`
	);
	const data = res.data;
	return {
		props: { data },
	};
};

export default Home;
