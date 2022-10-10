import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import get from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { useState } from 'react';
import Settings from '../../components/settings';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

const UserPage: NextPage = (props: any) => {
	const [showSettings, setShowSettings] = useState(false);

	const router = useRouter();

	const { data, error } = useSWR('https://api.dailies.tk/', fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;

	function closeSettings() {
		setShowSettings(false);
	}

	let settings = [];
	if (data?.permissions?.includes('ROLE_DELETE_USERS')) {
		settings.push(...['rename', 'delete']);
		settings.push(...['ban']);
	} else if (router.query.id == data.id) {
		settings.push(...['rename', 'delete']);
	}

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
				{showSettings ? (
					<Settings
						router={router}
						userdata={props.data}
						shownSettings={settings}
						closeSettings={closeSettings}
					/>
				) : (
					<></>
				)}
				{[''].map((item, index) => {
					if (props.data.banned) {
						if (!data?.permissions?.includes('ROLE_MODIFY_USERS')) {
							return (
								<div key={index}>
									<div className="text-center m-16 bg-red-700 bg-opacity-40 rounded-lg">
										<h1>
											<strong>WARNING</strong> This account is no longer
											available
										</h1>
									</div>
								</div>
							);
						} else {
							return (
								<div
									key={index}
									className="text-center m-16 bg-red-700 bg-opacity-40 rounded-lg"
								>
									<h1>This account is no longer available</h1>
								</div>
							);
						}
					}
					return;
				})}
				<div className="m-16 shadow-xl flex relative">
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
					<div className="right-3 top-3 absolute">
						<Image
							onClick={() => {
								setShowSettings(true);
							}}
							className="hover:rotate-[360deg] transition-all duration-300 ease-in-out cursor-pointer"
							src="/Ic_settings_48px.svg"
							alt=""
							width="48"
							height="48"
						/>
					</div>
				</div>
				<h1 className="ml-16 mb-4">
					<strong>Favorites</strong>
				</h1>
				<div className="grid gap-4 pl-16 pr-[1rem] mx-auto grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px]">
					{props.favorites.map((image: any, index: number) => {
						if (image.url.endsWith('.mp4')) {
							return (
								<Link key={index} href={image.url} passHref>
									<div className="relative object-fill">
										<div className="bg-gray-500 rounded-lg w-[225px] h-[320px] absolute">
											<Image
												src="/loading.gif"
												width="225"
												height="320"
												alt=""
												className="rounded-lg object-contain"
											/>
										</div>
										<video
											className="absolute w-[225px] h-[320px] object-fill rounded-lg"
											width="225"
											height="320"
											controls
										>
											<source src={image.url} type="video/mp4" />
											your browser is so old it can&apos;t even display
											video&apos;s smh my head my head
										</video>
										<div className="hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out">
											<div className="absolute top-0 z-5 left-[7.25rem]">
												<Image
													src="/star_icon_filled.svg"
													alt=""
													width="50"
													height="50"
												/>
											</div>
										</div>
									</div>
								</Link>
							);
						} else {
							return (
								<Link key={index} href={image.url} passHref>
									<div className="relative">
										<div className="bg-gray-500 rounded-lg w-[225px] h-[320px] absolute">
											<Image
												src="/loading.gif"
												width="225"
												height="320"
												alt=""
												className="rounded-lg object-contain"
											/>
										</div>
										<Image
											src={image.url}
											className="rounded-lg object-cover pointer-cursor transition-all duration-500 ease-in-out"
											alt=""
											width="225"
											height="320"
											placeholder="blur"
											blurDataURL={image.url}
										/>
										<div className="group hover:opacity-100 opacity-0 transition-all duration-100 ease-in-out cursor-pointer">
											<div className="absolute top-0 z-5 left-[7.25rem]">
												<Image
													onClick={() =>
														alert('Image added to favorites')
													}
													className="group-hover:opacity-100 transition-all duration-100 opacity-0"
													src="/star_icon_filled.svg"
													alt=""
													width="50"
													height="50"
												/>
											</div>
										</div>
									</div>
								</Link>
							);
						}
					})}
				</div>
			</main>
		</div>
	);
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
