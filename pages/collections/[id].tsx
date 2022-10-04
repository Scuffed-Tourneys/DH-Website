import get from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as schemas from '../../types/schemas';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then((r) => r.json());

const Home: NextPage = (props: any) => {
	const router = useRouter();

	const { data, error } = useSWR(`https://api.dailies.tk/collection/${router.query.id}`, fetcher);
	if (!data) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;

	const date = new Date(data.timestamp * 1000);

	return (
		<div>
			<Head>
				<title>{data.name}</title>
				<meta content={data.name} property="og:title" />
				<meta content="website" property="og:type" />
				<meta content={data.uploadedBy.username} property="og:description" />
				<meta content={`https://dailies.tk${router.asPath}`} property="og:url" />
				<meta content={data.images[0].url} property="og:image" />
				<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="ml-16 mt-4">
					<h1>
						<strong>{data.name}</strong>
					</h1>
					<h2>{data.uploadedBy.username}</h2>
					<p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</p>
				</div>
				<div className="grid gap-4 pl-16 pr-[1rem] mx-auto grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px]">
					{data.images.map((image: schemas.Image, index: number) => {
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
													src={
														image.favorited
															? '/star_icon_filled.svg'
															: '/star_icon_empty.svg'
													}
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

export default Home;
