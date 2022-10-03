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
							let imageIndex: number = 0;
							for (var i = 0; i < item.images.length; i++) {
								if (
									item.images[i].url.includes('.png') ||
									item.images[i].url.includes('.jpg') ||
									item.images[i].url.includes('.jpeg') ||
									item.images[i].url.includes('.gif')
								) {
									imageIndex = i;
									break;
								}
							}
							return (
								<Link key={index} href={`/collections/${item.id}`} passHref>
									<div className="showcase-flip-card">
										<div className="showcase-flip-card-inner">
											<div className="showcase-flip-card-front rounded-lg">
												<div>
													<div className="bg-gray-500 rounded-lg w-full h-full absolute">
														<Image
															src="/loading.gif"
															width="225"
															height="320"
															alt=""
															className="rounded-lg object-contain"
														/>
													</div>
													<Image
														src={item.images[imageIndex].url}
														className="rounded-lg object-cover transition-all duration-500 ease-in-out"
														alt=""
														width="225"
														height="320"
														placeholder="blur"
														blurDataURL={item.images[imageIndex].url}
													/>
												</div>
											</div>
											<div className="showcase-flip-card-back rounded-lg">
												<h1>
													<strong>{item.name}</strong>
												</h1>
												<p>
													<i>{item.uploadedBy.username}</i>
												</p>
												<br />
												<p>images: {item.images.length}</p>
											</div>
										</div>
									</div>
								</Link>
							);
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
