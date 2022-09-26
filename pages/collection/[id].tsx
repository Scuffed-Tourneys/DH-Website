import get from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as schemas from '../../types/schemas';

const Home: NextPage = (props: any) => {
	const date = new Date(props.data.timestamp * 1000);
	return (
		<div>
			<Head>
				<title>{props.data.name}</title>
				<meta content={props.data.name} property="og:title" />
				<meta content="website" property="og:type" />
				<meta content={props.data.uploadedBy.username} property="og:description" />
				<meta
					content={`https://dailies.tk/collection/${props.data.id}`}
					property="og:url"
				/>
				<meta content={props.data.images[0].url} property="og:image" />
				<meta content="#2f3136" data-react-helmet="true" name="theme-color" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="ml-16 mt-4">
					<h1>
						<strong>{props.data.name}</strong>
					</h1>
					<h2>{props.data.uploadedBy.username}</h2>
					<p>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</p>
				</div>
				<div className="grid gap-4 pl-16 pr-[1rem] mx-auto grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px]">
					{props.data.images.map((image: schemas.Image, index: number) => {
						if (image.url.endsWith('.mp4')) {
							return (
								<Link key={index} href={image.url} passHref>
									<div>
										<div className="bg-gray-500 rounded-lg w-[225px] h-[320px] absolute">
											<Image
												src="/loading.gif"
												width="225"
												height="320"
												alt=""
												className="rounded-lg object-contain"
											/>
										</div>
										<video width="225" height="320" controls>
											<source src={image.url} type="video/mp4" />
											your browser is so old it can&apos;t even display
											video&apos;s smh my head my head
										</video>
									</div>
								</Link>
							);
						} else {
							return (
								<Link key={index} href={image.url} passHref>
									<div>
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
	const res = await get(`https://api.dailies.tk/collection/${context.query.id}`);
	const data = res.data;
	return {
		props: { data },
	};
};

export default Home;
