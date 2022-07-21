import get from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
				<Showcase items={props.data} />
				<Link href={`/?page=${Number(router.query.page) + 1}`}>
					<Image
						src="https://cdn.discordapp.com/emojis/777535544216518656.webp?size=4096&quality=lossless"
						className="rounded-lg"
						alt=""
						width="100"
						height="100"
					/>
				</Link>
			</main>

			<footer></footer>
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
