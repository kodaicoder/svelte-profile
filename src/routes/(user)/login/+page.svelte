<script lang="ts">
	import Swal from 'sweetalert2';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { loginSchema } from '$lib/validators/loginSchema';
	import { zod } from 'sveltekit-superforms/adapters';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	export let data;

	let buttonLoadState = false;
	const { form, enhance, errors } = superForm(data.form, {
		invalidateAll: false,
		validators: zod(loginSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdate: ({ form }) => {
			if (Object.keys(form.errors).length === 0) {
				Swal.fire({
					title: 'Login success',
					text: 'You will be redirect shortly',
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				})
					.then(() => {
						goto(`${form.message.gotoLink}`);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				buttonLoadState = false;
			}
		},
		onError: ({ result }) => {
			buttonLoadState = false;
			let error, html;

			error = JSON.parse(result.error.message);
			html = 'Error occurred <br>' + error.status + ': ' + error.statusText;
			Swal.fire({
				title: 'Register failed',
				html,
				icon: 'error',
				confirmButtonText: 'Close',
				allowOutsideClick: false
			});
		}
	});
</script>

<div class="grid place-content-center">
	<div class="card flex flex-col gap-8 p-6">
		<h1>Sign in</h1>
		<form method="POST" use:enhance class="contents">
			<label class="label relative" for="email">
				<span>Email</span>
				<input
					name="email"
					id="email"
					class="input"
					title="Input email"
					type="email"
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<ErrorMessage
						errorMessage={$errors.email ? $errors.email[$errors.email.length - 1] : ''}
					/>
				{/if}
			</label>

			<label class="label relative" for="password">
				<span>Password</span>
				<input
					name="password"
					id="password"
					class="input"
					title="Input password"
					type="password"
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
				/>
				{#if $errors.password}
					<ErrorMessage
						errorMessage={$errors.password ? $errors.password[$errors.password.length - 1] : ''}
					/>
				{/if}
			</label>

			<div class="grid grid-cols-2 grid-rows-2 gap-6">
				<button
					type="submit"
					class="btn variant-gradient-tertiary-secondary col-span-2 flex-1 bg-gradient-to-br"
					disabled={buttonLoadState}
				>
					{#if buttonLoadState}
						<span class="h-4 w-4">
							<Spinner />
						</span>
					{:else}
						Login
					{/if}
				</button>

				<button
					type="button"
					class="variant-ringed-success btn flex-1 hover:bg-success-500/10"
					on:click={() => {
						goto('/register');
					}}
					disabled={buttonLoadState}
				>
					{#if buttonLoadState}
						<span class="h-4 w-4">
							<Spinner />
						</span>
					{:else}
						Register
					{/if}
				</button>

				<button
					type="button"
					class="variant-ringed-error btn flex-1 hover:bg-error-500/10"
					on:click={() => {
						goto('/');
					}}
					disabled={buttonLoadState}
				>
					{#if buttonLoadState}
						<span class="h-4 w-4">
							<Spinner />
						</span>
					{:else}
						Back
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
