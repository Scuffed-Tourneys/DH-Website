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
		<div class="max-w-6xl mx-auto p-3 text-white flex justify-between items-center">
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
