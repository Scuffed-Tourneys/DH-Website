<script setup>
const navItems = [
	{
		href: '/',
		label: 'Home',
	},
	{
		href: '/users',
		label: 'Users',
	},
	{
		href: '/history',
		label: 'History',
	},
	{
		href: '/team',
		label: 'Team',
	},
];
</script>

<template>
	<header class="bg-gradient-to-r from-blue-600 to-purple-700">
		<div class="max-w-6xl mx-auto p-6 text-white flex justify-between items-center">
			<div class="italic font-semibold text-2xl button-animation">
				<i>Daily<strong>Hentai</strong></i>
			</div>
			<nav class="hidden md:block" v-for="link in navItems" :key="link.label">
				<NuxtLink class="button-animation" :href="link.href">{{ link.label }}</NuxtLink>
			</nav>
			<div class="hidden md:block button-animation">Log <strong>In</strong></div>
		</div>
	</header>
</template>

<!--<template>
	<header class="bg-gradient-to-r from-blue-600 to-purple-700">
		<div class="max-w-6xl mx-auto p-6 text-white flex justify-between items-center">
			<div class="italic font-semibold text-2xl">
				<NuxtLink href="/" key="/">
					<a class="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
						Daily<strong>Hentai</strong>
					</a>
				</NuxtLink>
			</div>
			<nav class="hidden md:block">
				<NuxtLink v-for="link in navItems" :href="link.href" :key="link.href">
					<a class="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
						{{ link.label }}
					</a>
				</NuxtLink>
			</nav>
			<div class="hidden md:block">
				<NuxtLink href="https://api.challengepoints.net/api/auth/discord" key="/login">
					<a class="p-2 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded">
						Log <strong>In</strong>
					</a>
				</NuxtLink>
			</div>
		</div>
	</header>
</template>-->
