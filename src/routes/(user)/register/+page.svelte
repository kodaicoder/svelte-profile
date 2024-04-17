<script lang="ts">
	import Swal from 'sweetalert2';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { registerSchema } from '$lib/validators/registerSchema';
	import { zod } from 'sveltekit-superforms/adapters';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	export let data;

	let buttonLoadState = false;
	const { form, enhance, errors } = superForm(data.form, {
		validators: zod(registerSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdate: ({ form }) => {
			if (Object.keys(form.errors).length === 0) {
				Swal.fire({
					title: 'Register success',
					text: 'Your info has been saved successfully',
					icon: 'success',
					confirmButtonText: 'Go to login',
					allowOutsideClick: false
				})
					.then(() => {
						goto('/login');
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
		<h1>Sign up</h1>
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

			<label class="label relative" for="confirmPassword">
				<span>Confirm Password</span>
				<input
					name="confirmPassword"
					id="confirmPassword"
					class="input"
					title="Input confirm password"
					type="password"
					aria-invalid={$errors.confirmPassword ? 'true' : undefined}
					bind:value={$form.confirmPassword}
				/>
				{#if $errors.confirmPassword}
					<ErrorMessage
						errorMessage={$errors.confirmPassword
							? $errors.confirmPassword[$errors.confirmPassword.length - 1]
							: ''}
					/>
				{/if}
			</label>

			<label class="label relative" for="firstName">
				<span>First name</span>
				<input
					name="firstName"
					id="firstName"
					class="input"
					title="Input first name"
					type="text"
					aria-invalid={$errors.firstName ? 'true' : undefined}
					bind:value={$form.firstName}
				/>
				{#if $errors.firstName}
					<ErrorMessage
						errorMessage={$errors.firstName ? $errors.firstName[$errors.firstName.length - 1] : ''}
					/>
				{/if}
			</label>

			<label class="label relative" for="lastName">
				<span>Last name</span>
				<input
					name="lastName"
					id="lastName"
					class="input"
					title="Input last name"
					type="text"
					aria-invalid={$errors.lastName ? 'true' : undefined}
					bind:value={$form.lastName}
				/>
				{#if $errors.lastName}
					<ErrorMessage
						errorMessage={$errors.lastName ? $errors.lastName[$errors.lastName.length - 1] : ''}
					/>
				{/if}
			</label>

			<div class="flex w-full gap-6">
				<button
					type="submit"
					class="btn variant-gradient-tertiary-secondary flex-1 bg-gradient-to-br"
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
						goto('/login');
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
