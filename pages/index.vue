<script setup>
const dummyData = [
	{ id: 1, name: 'stupid', author: 'notme', tags: [] },
	{ id: 2, name: 'stupid', author: 'notme', tags: [] },
	{ id: 3, name: 'stupid', author: 'notme', tags: [] },
	{ id: 4, name: 'stupid', author: 'notme', tags: [] },
	{ id: 5, name: 'stupid', author: 'notme', tags: [] },
	{ id: 6, name: 'stupid', author: 'notme', tags: [] },
	{ id: 7, name: 'stupid', author: 'notme', tags: [] },
	{ id: 8, name: 'stupid', author: 'notme', tags: [] },
];
</script>

<template>
	<div>
		<div class="showcase-grid">
			<a v-for="item in dummyData" :key="item" :href="'/theme/' + item.id">
				<div className="showcase-flip-card">
					<div className="showcase-flip-card-inner">
						<div className="showcase-flip-card-front rounded-lg">
							<img
								src="https://cdn.myanimelist.net/images/anime/1037/122516.jpg"
								className="rounded-lg"
								alt=""
								width="225"
								height="320"
							/>
						</div>
						<div className="showcase-flip-card-back rounded-lg">
							<h1>
								<strong>{{ item.name }}</strong>
							</h1>
							<p>
								<i>{{ item.author }}</i>
							</p>
							<br />
							<p>Tags: {{ item.tags.join() }}</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>
