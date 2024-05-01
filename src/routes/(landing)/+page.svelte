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

	//! The 3 data below should be fetch from API
	// const skillDatas: ISkill[] = [
	// 	{
	// 		name: 'HTML',
	// 		level: 4.5,
	// 		image:
	// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
	// 		link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
	// 	},
	// 	{
	// 		name: 'CSS',
	// 		level: 4.5,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
	// 		link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
	// 	},
	// 	{
	// 		name: 'TailwindCSS',
	// 		level: 2.5,
	// 		image:
	// 			'https://b2dmain-ruk.cdn.jelastic.net/wp-content/uploads/2023/10/social-square.eab77323-removebg-preview.png',
	// 		link: 'https://tailwindcss.com/'
	// 	},
	// 	{
	// 		name: 'JavaScript',
	// 		level: 4.5,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
	// 		link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
	// 	},
	// 	{
	// 		name: 'TypeScript',
	// 		level: 4,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
	// 		link: 'https://www.typescriptlang.org/'
	// 	},
	// 	{
	// 		name: 'JQuery',
	// 		level: 3.5,
	// 		image: 'https://miro.medium.com/v2/resize:fit:400/1*ymOY1JGxinEMxxHkqI0T7Q.png',
	// 		link: 'https://jquery.com/'
	// 	},
	// 	{
	// 		name: 'C# .Net Core',
	// 		level: 4,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg',
	// 		link: 'https://dotnet.microsoft.com/'
	// 	},
	// 	{
	// 		name: 'Go lang',
	// 		level: 3.5,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg',
	// 		link: 'https://golang.org/'
	// 	},
	// 	{
	// 		name: 'NodeJS',
	// 		level: 4,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
	// 		link: 'https://nodejs.org/'
	// 	},
	// 	{
	// 		name: 'Svelte',
	// 		level: 4.5,
	// 		image:
	// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
	// 		link: 'https://svelte.dev/'
	// 	},
	// 	{
	// 		name: 'SvelteKit',
	// 		level: 3.5,
	// 		image:
	// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
	// 		link: 'https://kit.svelte.dev/'
	// 	},
	// 	{
	// 		name: 'React',
	// 		level: 4,
	// 		image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
	// 		link: 'https://reactjs.org/'
	// 	},
	// 	{
	// 		name: 'NextJS',
	// 		level: 3.5,
	// 		image:
	// 			'https://d2nir1j4sou8ez.cloudfront.net/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png',
	// 		link: 'https://nextjs.org/'
	// 	}
	// ];
	const projectDatas: IShowCaseCard[] = [
		{
			title: 'Project 1',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit.
						Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit.
						Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. `,
			images: [
				'https://picsum.photos/400/300.webp?random=1',
				'https://picsum.photos/400/300.webp?random=2'
			],
			sourceLink: 'https://www.google.com',
			link: 'https://www.twitter.com'
		},
		{
			title: 'Project 2',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
				Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. `,
			images: [
				'https://picsum.photos/400/300.webp?random=3',
				'https://picsum.photos/400/300.webp?random=4'
			],
			sourceLink: 'www.google.com',
			link: 'https://www.twitter.com'
		},
		{
			title: 'Project 3',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
	Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. `,
			images: [
				'https://picsum.photos/400/300.webp?random=5',
				'https://picsum.photos/400/300.webp?random=6'
			],
			sourceLink: 'www.google.com',
			link: 'https://www.twitter.com'
		},
		{
			title: 'Project 11',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=11',
				'https://picsum.photos/400/300.webp?random=12'
			],
			sourceLink: 'www.google.com',
			link: 'https://www.twitter.com'
		},
		{
			title: 'Project 22',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=13',
				'https://picsum.photos/400/300.webp?random=14'
			],
			sourceLink: 'www.google.com',
			link: 'https://www.twitter.com'
		},
		{
			title: 'Project 33',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=15',
				'https://picsum.photos/400/300.webp?random=16'
			],
			sourceLink: 'www.google.com',
			link: 'https://www.twitter.com'
		}
	];
	const articleDatas: IShowCaseCard[] = [
		{
			title: 'Article 1',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=7',
				'https://picsum.photos/400/300.webp?random=8'
			],

			link: 'https://dev.to/'
		},
		{
			title: 'Article 2',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=9',
				'https://picsum.photos/400/300.webp?random=10'
			],
			link: 'https://dev.to/'
		},
		{
			title: 'Article 3',
			content: `lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.lorem ipsum dolor sit amet consectetur adipisicing elit. 
			Cumque dolore aliquam, nihil odio.`,
			images: [
				'https://picsum.photos/400/300.webp?random=21',
				'https://picsum.photos/400/300.webp?random=22'
			],
			link: 'https://dev.to/'
		}
	];
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
