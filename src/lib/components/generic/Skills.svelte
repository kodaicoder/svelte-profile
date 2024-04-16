<script lang="ts">
	import SkillLine from './SkillLine.svelte';
	import type ISkill from '$lib/types/ISkill';

	export let skillDatas: ISkill[];
</script>

<ul class=" mx-24 grid grid-cols-1 gap-12 gap-x-28 md:grid-cols-2">
	{#each skillDatas as skillData, index}
		<SkillLine {skillData} />
	{/each}
</ul>
