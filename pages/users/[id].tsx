import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import get from 'axios';
import useSWR from 'swr';
import Showcase from '../../components/showcase';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

const UserPage: NextPage = (props: any) => {
	const router = useRouter();

	const { data, error } = useSWR('https://api.dailies.tk/', fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;

	if (props.data.banned) {
		console.log(data);
		if (!data?.permissions?.includes('ROLE_MODIFY_USERS')) {
			return (
				<div className="text-center m-16 bg-red-700 bg-opacity-40 rounded-lg">
					<h1>This account is no longer available</h1>
				</div>
			);
		} else {
			return (
				<div>
					<Head>
						<title>Dailies</title>
						<meta content="Dailies" property="og:title" />
						<meta content="website" property="og:type" />
						<meta content={props.data.username} property="og:description" />
						<meta content={`https://dailies.tk${router.asPath}`} property="og:url" />
						<meta content={props.data.avatarUrl} property="og:image" />
						<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
						<link rel="icon" href="/favicon.ico" />
					</Head>

					<main>
						<div>
							<div className="text-center m-16 bg-red-700 bg-opacity-40 rounded-lg">
								<h1>
									<strong>WARNING</strong> This account is no longer available
								</h1>
							</div>
						</div>
						<div className="m-16 shadow-xl flex">
							<div className="m-5">
								<Image
									className="rounded-full"
									src={props.data.avatarUrl}
									alt=""
									width="256"
									height="256"
								/>
							</div>
							<div className="m-5 my-auto">
								<h1 className="text-lg">
									<strong>{props.data.username}</strong>
								</h1>
								<h1>
									Uploaded: <strong>{props.data.imagesUploaded}</strong>
								</h1>
								<h1>
									Favorites: <strong>{props.data.imagesFavorited}</strong>
								</h1>
								<h1>
									Rated: <strong>{props.data.imagesRated}</strong>
								</h1>
								<h1>
									Average Rating: <strong>{props.data.averageRating}</strong>
								</h1>
							</div>
						</div>
						<div></div>
					</main>
				</div>
			);
		}
	} else {
		return (
			<div>
				<Head>
					<title>Dailies</title>
					<meta content="Dailies" property="og:title" />
					<meta content="website" property="og:type" />
					<meta content={props.data.username} property="og:description" />
					<meta content={`https://dailies.tk${router.asPath}`} property="og:url" />
					<meta content={props.data.avatarUrl} property="og:image" />
					<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<div className="m-16 shadow-xl flex">
						<div className="m-5">
							<Image
								className="rounded-full"
								src={props.data.avatarUrl}
								alt=""
								width="256"
								height="256"
							/>
						</div>
						<div className="m-5 my-auto">
							<h1 className="text-lg">
								<strong>{props.data.username}</strong>
							</h1>
							<h1>
								Uploaded: <strong>{props.data.imagesUploaded}</strong>
							</h1>
							<h1>
								Favorites: <strong>{props.data.imagesFavorited}</strong>
							</h1>
							<h1>
								Rated: <strong>{props.data.imagesRated}</strong>
							</h1>
							<h1>
								Average Rating: <strong>{props.data.averageRating}</strong>
							</h1>
						</div>
					</div>
					<div className="grid gap-4 pl-16 pr-[1rem] mx-auto grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px]">
						{props.favorites.map((item: any, index: number) => {
							return <Link key={index} href={item.url} passHref></Link>;
						})}
					</div>
				</main>
			</div>
		);
	}
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const res = await get(`https://api.dailies.tk/user/${context.query.id}`);
	const res2 = await get(
		`https://api.dailies.tk/user/${context.query.id}/favorites?offset=${
			Number(context.query?.page) * 18
		}&limit=18`
	);
	let data = res.data;
	let favorites = res2.data;
	if (!data) {
		data = [];
	}
	if (!favorites) {
		favorites = [];
	}
	return {
		props: { data, favorites },
	};
};

export default UserPage;
