<script lang="ts">
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import {
		profileDetailSchema,
		profilePictureSchema,
		resumeFileSchema
	} from '$lib/validators/profileSchema';
	import Swal from 'sweetalert2';
	import { Avatar } from '@skeletonlabs/skeleton';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';

	export let data: PageData;
	let buttonLoadState = false;

	const {
		form: profilePictureForm,
		enhance: profilePictureEnhance,
		errors: profilePictureErrors
	} = superForm(data.profilePictureForm, {
		resetForm: true,
		invalidateAll: 'force',
		validators: zod(profilePictureSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdate: ({ form }) => {
			if (Object.keys(form.errors).length === 0) {
				Swal.fire({
					title: 'Upload new picture success',
					text: 'Your new profile picture has been saved successfully',
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				})
					.then(async () => {
						// something handle success upload picture
						//await invalidateAll();
						buttonLoadState = false;
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
				title: 'Upload failed',
				html,
				icon: 'error',
				confirmButtonText: 'Close',
				allowOutsideClick: false
			});
		}
	});
	const profilePicture = fileProxy(profilePictureForm, 'uploadImage');

	const {
		form: profileDetailForm,
		enhance: profileDetailEnhance,
		errors: profileDetailErrors
	} = superForm(data.profileDetailForm, {
		dataType: 'json',
		resetForm: true,
		invalidateAll: 'force',
		validators: zod(profileDetailSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdate: ({ form }) => {
			if (Object.keys(form.errors).length === 0) {
				Swal.fire({
					title: 'Update success',
					text: 'Your new profile detail has been saved successfully',
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				})
					.then(async () => {
						// something handle success upload picture
						//await invalidateAll();
						buttonLoadState = false;
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
				title: 'Update failed',
				html,
				icon: 'error',
				confirmButtonText: 'Close',
				allowOutsideClick: false
			});
		}
	});

	const {
		form: resumeFileForm,
		enhance: resumeFileEnhance,
		errors: resumeFileErrors
	} = superForm(data.resumeFileForm, {
		resetForm: true,
		invalidateAll: 'force',
		validators: zod(resumeFileSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdate: ({ form }) => {
			if (Object.keys(form.errors).length === 0) {
				Swal.fire({
					title: 'Upload new resume success',
					text: 'Your new resume has been saved successfully',
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				})
					.then(async () => {
						// something handle success upload picture
						//await invalidateAll();
						buttonLoadState = false;
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
				title: 'Upload failed',
				html,
				icon: 'error',
				confirmButtonText: 'Close',
				allowOutsideClick: false
			});
		}
	});
	const resume = fileProxy(resumeFileForm, 'uploadResume');
</script>

<div class="card grid p-6">
	<h1 class="mb-6 text-3xl">Manage Profile</h1>

	<form
		id="profilePictureForm"
		name="profilePictureForm"
		method="POST"
		action="?/profilePictureUpload"
		enctype="multipart/form-data"
		use:profilePictureEnhance
		class="flex flex-col items-center gap-6"
	>
		<input type="hidden" name="userId" bind:value={$profilePictureForm.userId} />
		<input type="hidden" name="url" bind:value={$profilePictureForm.url} />
		<Avatar
			src={$profilePictureForm.url
				? $profilePictureForm.url
				: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'}
			width="size-40 "
			rounded="!rounded-full"
			alt="hero"
		/>
		<div class="flex items-end justify-center gap-4">
			<label class="label relative max-w-md" for="uploadImage">
				<span class="relative"> Upload profile picture </span>
				<small class="ml-2">{`(size <= 500 kb)`}</small>
				<input
					id="uploadImage"
					name="uploadImage"
					class="input"
					type="file"
					accept=".jpg, .jpeg, .png, .webp"
					aria-invalid={$profilePictureErrors.uploadImage ? 'true' : undefined}
					bind:files={$profilePicture}
				/>
				{#if $profilePictureErrors.uploadImage}
					<ErrorMessage
						errorMessage={$profilePictureErrors.uploadImage
							? $profilePictureErrors.uploadImage[$profilePictureErrors.uploadImage.length - 1]
							: ''}
					/>
				{/if}
			</label>
			<button
				type="submit"
				class="btn variant-gradient-tertiary-secondary w-32 flex-1 bg-gradient-to-br"
				disabled={buttonLoadState}
			>
				{#if buttonLoadState}
					<Spinner class="h-6 w-6 text-surface-700" />
				{:else}
					Upload
				{/if}
			</button>
		</div>
	</form>

	<hr class="neon mx-auto my-8 w-[90%]" />

	<form
		id="profileDetailForm"
		name="profileDetailForm"
		class="grid grid-cols-1 gap-6 justify-self-center p-8 md:max-w-6xl md:grid-cols-2"
		method="POST"
		action="?/profileDetailUpdate"
		use:profileDetailEnhance
	>
		<label class="label relative" for="email">
			<span class="relative"> Email </span>
			<input
				id="email"
				name="email"
				class="input"
				type="email"
				placeholder="Enter email..."
				bind:value={$profileDetailForm.email}
			/>
		</label>
		<label class="label relative" for="firstName">
			<span class="relative"> First Name </span>
			<input
				id="firstName"
				name="firstName"
				class="input"
				type="text"
				placeholder="Enter first name..."
				bind:value={$profileDetailForm.firstName}
			/>
		</label>
		<label class="label relative" for="lastName">
			<span class="relative"> Last Name </span>
			<input
				id="lastName"
				name="lastName"
				class="input"
				type="text"
				placeholder="Enter last name..."
				bind:value={$profileDetailForm.lastName}
			/>
		</label>
	</form>
	<button
		type="submit"
		class="btn variant-gradient-tertiary-secondary mx-auto w-32 flex-1 bg-gradient-to-br"
		disabled={buttonLoadState}
	>
		{#if buttonLoadState}
			<Spinner class="h-6 w-6 text-surface-700" />
		{:else}
			Update
		{/if}
	</button>

	<hr class="neon mx-auto my-8 w-[90%]" />

	<form
		id="resumeFileForm"
		name="resumeFileForm"
		method="POST"
		action="?/resumeUpload"
		enctype="multipart/form-data"
		use:resumeFileEnhance
		class="flex flex-col items-center gap-6"
	>
		<input type="hidden" name="userId" bind:value={$resumeFileForm.userId} />
		<input type="hidden" name="url" bind:value={$resumeFileForm.url} />

		<div class="flex items-end justify-center gap-4">
			<label class="label relative max-w-md" for="uploadImage">
				<span class="relative"> Upload resume </span>
				<small class="ml-2">{`(size <= 5 mb)`}</small>
				<input
					id="uploadResume"
					name="uploadResume"
					class="input"
					type="file"
					accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
					aria-invalid={$resumeFileErrors.uploadResume ? 'true' : undefined}
					bind:files={$resume}
				/>
				{#if $resumeFileErrors.uploadResume}
					<ErrorMessage
						errorMessage={$resumeFileErrors.uploadResume
							? $resumeFileErrors.uploadResume[$resumeFileErrors.uploadResume.length - 1]
							: ''}
					/>
				{/if}
			</label>
			<button
				type="submit"
				class="btn variant-gradient-tertiary-secondary w-32 flex-1 bg-gradient-to-br"
				disabled={buttonLoadState}
			>
				{#if buttonLoadState}
					<Spinner class="h-6 w-6 text-surface-700" />
				{:else}
					Upload
				{/if}
			</button>
		</div>
		{#if $resumeFileForm.url}
			<a
				id="currentResume"
				href={$resumeFileForm.url}
				target="_blank"
				class="btn variant-gradient-success-warning bg-gradient-to-br"
			>
				Download Current Resume
			</a>
		{/if}
	</form>
</div>

<!-- 
<div class="card grid p-6">
	<h1 class=" text-3xl">Manage Profile</h1>

	<form
		id="profileForm"
		name="profileForm"
		class="grid grid-cols-1 gap-6 justify-self-center p-8 md:max-w-6xl md:grid-cols-2"
	>
		<label class="label relative" for="profileImage">
			<span class="relative"> Upload profile picture </span>
			<small class="ml-2">{`(size <= 500 kb)`}</small>
			<input
				id="profileImage"
				name="profileImage"
				class="input"
				type="file"
				accept=".jpg, .jpeg, .png"
			/>
		</label>
		<label class="label relative" for="email">
			<span class="relative"> Email </span>
			<input id="email" name="email" class="input" type="email" placeholder="Enter email..." />
		</label>
		<label class="label relative" for="firstName">
			<span class="relative"> First Name </span>
			<input
				id="firstName"
				name="firstName"
				class="input"
				type="text"
				placeholder="Enter first name..."
			/>
		</label>
		<label class="label relative" for="lastName">
			<span class="relative"> Last Name </span>
			<input
				id="lastName"
				name="lastName"
				class="input"
				type="text"
				placeholder="Enter last name..."
			/>
		</label>
	</form>

	<footer class="flex place-content-center gap-12">
		<button
			type="submit"
			form="profileForm"
			class="variant-filled-success btn w-28"
			disabled={buttonLoadState}
		>
			{#if buttonLoadState}
				<Spinner class="h-6 w-6 text-surface-700" />
			{:else}
				Submit
			{/if}
		</button>

		<button
			class="variant-ringed-error btn w-28 hover:bg-error-500/20"
			on:click={() => alert('Reset form')}
			disabled={buttonLoadState}
		>
			{#if buttonLoadState}
				<Spinner class="h-6 w-6 text-surface-700" />
			{:else}
				Reset
			{/if}
		</button>
	</footer>
</div> -->
