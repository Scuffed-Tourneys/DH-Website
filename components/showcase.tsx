import Image from 'next/image';
import Link from 'next/link';
import * as Schemas from '../types/schemas';

interface props {
	items: Schemas.ThemeSchema[];
}

const Showcase = (props: props) => {
	return (
		<div className="showcase-grid">
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
									<Image
										src={item.images[imageIndex].url}
										className="rounded-lg object-cover transition-all duration-500 ease-in-out"
										alt=""
										width="225"
										height="320"
										placeholder="blur"
										blurDataURL="https://cdn.discordapp.com/emojis/777535544216518656.webp?size=4096&quality=lossless"
									/>
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
