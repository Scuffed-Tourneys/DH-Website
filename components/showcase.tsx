import Image from 'next/image';
import Link from 'next/link';
import * as Schemas from '../types/schemas';

interface props {
	items: Schemas.ThemeSchema[];
}

const Showcase = (props: props) => {
	return (
		<div className="grid gap-4 pl-16 pr-[1rem] mx-auto grid-cols-6 grid-rows-3 w-min-[0px] w-max-[1920px] h-min-[0px] h-max-[1080px]">
			{props.items.map((item, index) => {
				let imageIndex: number = 0;
				for (var i = 0; i < item.images.length; i++) {
					if (
						item.images[i].url.includes('.png') ||
						item.images[i].url.includes('.jpg')
					) {
						imageIndex = i;
						break;
					}
				}
				return (
					<Link key={index} href={`/collection/${item.id}`} passHref>
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
	);
};

export default Showcase;
