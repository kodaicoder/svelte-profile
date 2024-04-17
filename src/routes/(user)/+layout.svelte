<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell
	regionPage="scroll-smooth snap-y snap-mandatory"
	slotPageHeader="left-1 z-20 m-1 mb-3 w-full pr-4 md:pr-8"
>
	<div class="my-8">
		<slot />
	</div>
</AppShell>
