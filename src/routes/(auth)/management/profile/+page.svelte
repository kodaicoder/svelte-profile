<script lang="ts">
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { fileProxy, formFieldProxy, superForm } from 'sveltekit-superforms';
	import {
		profileDetailSchema,
		profilePictureSchema,
		resumeFileSchema
	} from '$lib/validators/profileSchema';
	import toast, { Toaster } from 'svelte-french-toast';
	import Swal from 'sweetalert2';
	import { Avatar } from '@skeletonlabs/skeleton';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';

	export let data: PageData;
	let buttonLoadState = false;

	const {
		form: profilePictureForm,
		enhance: profilePictureEnhance,
		errors: profilePictureErrors,
		reset: resetProfilePictureForm
	} = superForm(data.profilePictureForm, {
		invalidateAll: false,
		validators: zod(profilePictureSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				resetProfilePictureForm({ data: form.data });
				buttonLoadState = false;
				toast.success('Upload new picture success!', {
					className: '!bg-success-400'
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
		resetForm: false,
		invalidateAll: false,
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

	// $: console.log($profileDetailForm);

	const {
		form: resumeFileForm,
		enhance: resumeFileEnhance,
		errors: resumeFileErrors,
		reset: resetResumeFileForm
	} = superForm(data.resumeFileForm, {
		invalidateAll: false,
		validators: zod(resumeFileSchema),
		onSubmit: () => {
			buttonLoadState = true;
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				resetResumeFileForm({ data: form.data });
				buttonLoadState = false;
				toast.success('Upload new resume success!', {
					className: '!bg-success-400'
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

	async function changeSkillImage(skillId: number | undefined) {
		const fileInputElement = document.getElementById(`skillIcon${skillId}`);
		if (fileInputElement) {
			fileInputElement.addEventListener('input', (event) => {
				const files = (<HTMLInputElement>event.currentTarget).files;
				if (!files || files?.length === 0) return;
				const selectedFile = files[0];
				/// check selected file is ok ?
				//! if not return error
				//? if yes then upload file to vercel and then update the url in the form store

				console.log('Selected file:', selectedFile);
			});
			fileInputElement.click();
		}
	}

	async function changeSocialImage(socialLinkId: number | undefined) {
		const fileInputElement = document.getElementById(`socialIcon${socialLinkId}`);
		if (fileInputElement) {
			fileInputElement.addEventListener('input', (event) => {
				const files = (<HTMLInputElement>event.currentTarget).files;
				if (!files || files?.length === 0) return;
				const selectedFile = files[0];
				/// check selected file is ok ?
				//! if not return error
				//? if yes then upload file to vercel and then update the url in the form store

				console.log('Selected file:', selectedFile);
			});
			fileInputElement.click();
		}
	}

	async function deleteSkill(skillId: number | undefined) {
		console.log('Delete skill:', skillId);
	}

	async function deleteSocialLink(socialLinkId: number | undefined) {
		console.log('Delete social link:', socialLinkId);
	}
</script>

<Toaster />
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
			bind:src={$profilePictureForm.url}
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
		method="POST"
		action="?/profileDetailUpdate"
		class="flex flex-col items-center justify-center gap-6"
		use:profileDetailEnhance
	>
		<div class="grid grid-cols-1 gap-6 justify-self-center px-8 md:max-w-6xl md:grid-cols-2">
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
			<div></div>
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
		</div>
		<div class="flex w-full flex-col px-2 md:max-w-3xl">
			<h3 class="mb-4 self-start">Skill</h3>
			<ul class="flex max-h-[400px] flex-col gap-4 overflow-auto">
				{#each $profileDetailForm.skills as skill (skill.id)}
					<li class="flex items-center justify-center gap-4">
						<input
							id={`skillIcon${skill.id}`}
							type="file"
							class="invisible hidden size-0 opacity-0"
						/>
						<button
							type="button"
							class="group relative h-12 min-w-12 rounded-full p-2 hover:bg-slate-400"
							title="change image"
							on:click={() => changeSkillImage(skill.id)}
						>
							<RefreshIcon
								class="absolute left-1/2 top-1/2 z-10 hidden size-6 -translate-x-1/2 -translate-y-1/2 text-slate-800 group-hover:block"
							/>
							<img
								src={skill.image?.url}
								alt={skill.name}
								class="size-full object-contain group-hover:opacity-30"
							/>
						</button>
						<input type="text" name="name" class="input" bind:value={skill.name} />
						<input type="text" name="link" class="input" bind:value={skill.link} />
						<input
							type="number"
							step="0.5"
							min="0"
							max="5"
							name="level"
							class="input"
							bind:value={skill.level}
						/>
						<button
							class="variant-ringed-error btn-icon p-2 hover:bg-red-900"
							on:click={() => deleteSkill(skill.id)}
						>
							<DeleteIcon class="size-6" />
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex w-full flex-col px-2 md:max-w-3xl">
			<h3 class="mb-4 self-start">Social Link</h3>
			<ul class="flex flex-col gap-4">
				{#each $profileDetailForm.socialLinks as socialLink (socialLink.id)}
					{#if socialLink.type.toUpperCase() !== 'EMAIL'}
						<li class="flex items-center justify-center gap-4 pr-[1.1rem]">
							<button
								type="button"
								class="group relative h-12 min-w-12 rounded-full p-2 hover:bg-slate-400"
								title="change image"
								on:click={() => changeSocialImage(socialLink.id)}
							>
								<RefreshIcon
									class="absolute left-1/2 top-1/2 z-10 hidden size-6 -translate-x-1/2 -translate-y-1/2 text-slate-800 group-hover:block"
								/>
								<img
									src={socialLink.image?.url}
									alt={socialLink.type}
									class="social-icon size-full object-contain group-hover:opacity-30"
								/>
							</button>

							<input type="text" name="link" class="input" bind:value={socialLink.link} />
							<button
								class="variant-ringed-error btn-icon p-2 hover:bg-red-900"
								on:click={() => deleteSocialLink(socialLink.id)}
							>
								<DeleteIcon class="size-6" />
							</button>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
		<button
			type="submit"
			class="btn variant-gradient-tertiary-secondary mx-auto w-32 flex-1 bg-gradient-to-br"
			disabled={buttonLoadState}
		>
			{#if buttonLoadState}
				<Spinner class="h-6 w-6 text-surface-700" />
			{:else}
				Save
			{/if}
		</button>
	</form>

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
