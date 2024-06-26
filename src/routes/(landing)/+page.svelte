<script lang="ts">
	import type { PageData } from './$types';

	import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte';
	import NeonText from '$lib/components/generic/NeonText.svelte';
	import NextSectionButton from '$lib/components/generic/NextSectionButton.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	// import aboutMeImage from '$lib/images/web_dev.webp';
	import aboutMeImage from '$lib/images/aboutme.webp';

	import FooterBar from '$lib/components/layout/FooterBar.svelte';
	import MottoBlock from '$lib/components/generic/MottoBlock.svelte';
	import CarouselWithSearch from '$lib/components/generic/CarouselWithSearch.svelte';
	import LogoutButton from '$lib/components/generic/LogoutButton.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import type IShowCaseCard from '$lib/types/IShowCaseCard';
	import Skills from '$lib/components/generic/Skills.svelte';

	export let data: PageData;

	const socialLinkList = data.socialLinks;
	const userData = data.user;
	const skillsData = data.skills;
	const projects = data.projects;
	const articles = data.articles;

	const projectDatas: IShowCaseCard[] = projects.map((project) => ({
		id: project.id, // assuming this is the correct field
		title: project.title,
		content: project.content, // assuming 'content' should be mapped to 'description'
		images: [project.image?.url],
		sourceLink: project.sourceLink,
		link: project.link
	}));

	const articleDatas: IShowCaseCard[] = articles.map((article) => ({
		id: article.id, // assuming this is the correct field
		title: article.title,
		content: article.content,
		images: [article.image?.url],
		link: article.link
	}));
</script>

<section id="hero" class="relative flex h-dvh snap-start snap-always flex-col">
	<div
		class="flex h-full flex-col flex-wrap items-center justify-center gap-6 lg:flex-row-reverse lg:items-end lg:justify-around lg:gap-0"
	>
		<div class="relative mt-auto">
			<Avatar
				src={data.imageUrl}
				width="size-40 md:size-52 lg:size-72"
				rounded="!rounded-full"
				alt="Nutchapon Makelai"
			/>
			<div class=" neon absolute top-0 size-40 animate-pulse !rounded-full md:size-52 lg:size-72" />
		</div>
		<div
			class="flex flex-col items-center justify-center *:leading-[3rem] lg:items-start lg:*:leading-[5rem]"
		>
			<h1>
				<NeonText>Hi</NeonText>, I'm Nutchapon.
			</h1>
			<h3 class="relative lg:ml-20">
				<NeonText>AKA</NeonText>&nbsp;&nbsp;Kodai Coder
			</h3>
			<h2 class="lg:ml-28">I'm&nbsp;&nbsp;full-stack&nbsp;&nbsp;developer</h2>
		</div>
		<div class="mb-[8vh] mt-auto h-28 self-center md:mb-[6vh] md:w-3/5">
			<MottoBlock />
		</div>
	</div>

	<div class=" absolute bottom-2 flex w-full justify-center">
		<NextSectionButton scrollTo="skill"></NextSectionButton>
	</div>
</section>

<section id="skill" class="relative flex h-dvh snap-start snap-always flex-col py-4">
	<div class="flex items-center justify-center gap-6">
		<h1 class="h1 whitespace-nowrap text-center">
			<NeonText>#</NeonText>&nbsp;Skill
		</h1>
		<hr class="neon w-1/2" />
	</div>
	<div class="section-content my-4 mb-12 h-full overflow-y-auto px-4">
		<Skills {skillsData} />
	</div>
	<div class="absolute bottom-2 flex w-full justify-center">
		<NextSectionButton scrollTo="project"></NextSectionButton>
	</div>
</section>

<section id="project" class="relative flex h-dvh snap-start snap-always flex-col gap-2 pt-4">
	<div class="flex items-center justify-center gap-6">
		<hr class="neon w-1/2" />
		<h1 class="h1 whitespace-nowrap text-center">
			<NeonText>#</NeonText>&nbsp;Project
		</h1>
	</div>
	<div class="section-content flex flex-auto flex-col">
		<CarouselWithSearch cardDatas={projectDatas} />
	</div>
	<div class="mb-2 flex w-full justify-center">
		<NextSectionButton scrollTo="article"></NextSectionButton>
	</div>
</section>

<section id="article" class="relative flex h-dvh snap-start snap-always flex-col gap-2 pt-4">
	<div class="flex items-center justify-center gap-6">
		<h1 class="h1 whitespace-nowrap text-center">
			<NeonText>#</NeonText>&nbsp;Article
		</h1>
		<hr class="neon w-1/2" />
	</div>
	<div class="section-content flex h-full flex-col">
		<CarouselWithSearch cardDatas={articleDatas} imagePosition="right" />
	</div>
	<div class="mb-2 flex w-full justify-center">
		<NextSectionButton scrollTo="aboutme"></NextSectionButton>
	</div>
</section>

<section id="aboutme" class="relative flex h-dvh snap-end snap-always flex-col py-4">
	<div class="mb-4 flex w-full items-center justify-center gap-6">
		<hr class="neon w-1/2" />
		<h1 class="h1 flex whitespace-nowrap text-center">
			<NeonText>#</NeonText>&nbsp;About me
		</h1>
	</div>
	<div class="section-content flex flex-col items-center justify-center gap-6 px-4 md:px-36">
		<div class="grid grid-cols-1 items-center justify-center lg:grid-cols-2">
			<img
				src={aboutMeImage}
				alt="neon style developer"
				class="hidden size-[250px] justify-self-center overflow-hidden rounded-full object-cover object-left-top lg:block"
			/>
			<p class="text-surface-800-100-token text-sm lg:text-lg">
				Hello, my name is Nutchapon Makelai. I'm a full stack developer at Thai Beverage Plc for 5
				Years now. I'm a self-taught developer based in Pathumthani, Thailand. <br />I can
				developing a reactive website that compatible with all devices and screen sizes. I'm a fast
				learner and always eager to learn new web technologies.
			</p>
		</div>

		<h3>Let work together !</h3>
		{#if userData}
			<div class="flex gap-8">
				<button
					type="button"
					class="variant-filled-primary btn flex w-fit gap-4"
					on:click={() => {
						window.open(`${data.resumeUrl}`, '_blank');
					}}
				>
					<DownloadIcon class="w-8" />
					Download resume
				</button>
				<LogoutButton class="h-full" on:click={() => location.reload()} />
			</div>
		{:else}
			<a
				href="/login"
				class="variant-filled-primary btn btn-lg flex w-fit gap-4 text-sm md:text-base"
			>
				Please login before download resume
			</a>
		{/if}
	</div>
	<div class="mt-auto">
		<FooterBar {socialLinkList} />
	</div>
</section>
