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
	import { tick } from 'svelte';

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
		errors: profileDetailErrors,
		validateForm: validateProfileDetailForm
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
			fileInputElement.click();
		}
	}

	async function addSkill() {
		const maxId = Math.max(...$profileDetailForm.skills.map((skill) => skill.id));
		const newId = maxId + 1;
		profileDetailForm.update(($profileDetailForm) => {
			$profileDetailForm.skills = [
				...$profileDetailForm.skills,
				{
					id: newId,
					name: '',
					link: null,
					level: 0.5,
					image: null,
					uploadImage: null,
					isActive: true
				}
			];
			return $profileDetailForm;
		});

		await tick();
		document.getElementById('skillIconBtn' + newId)?.focus();
	}

	async function deleteSkill(skillIndex: number) {
		profileDetailForm.update(($profileDetailForm) => {
			$profileDetailForm.skills = $profileDetailForm.skills.filter((_, idx) => idx !== skillIndex);
			return $profileDetailForm;
		});

		profileDetailErrors.update(($profileDetailErrors) => {
			if ($profileDetailErrors?.skills) {
				$profileDetailErrors.skills = undefined;
			}
			return $profileDetailErrors;
		});
	}

	async function changeSocialImage(socialLinkId: number | undefined) {
		const fileInputElement = document.getElementById(`socialLinkIcon${socialLinkId}`);
		if (fileInputElement) {
			fileInputElement.click();
		}
	}
	async function addSocialLink() {
		const maxId = Math.max(...$profileDetailForm.socialLinks.map((socialLink) => socialLink.id));
		const newId = maxId + 1;
		profileDetailForm.update(($profileDetailForm) => {
			$profileDetailForm.socialLinks = [
				...$profileDetailForm.socialLinks,
				{
					id: newId,
					link: '',
					image: null,
					uploadImage: null,
					isActive: true
				}
			];
			return $profileDetailForm;
		});

		await tick();
		document.getElementById('socialLinkIconBtn' + newId)?.focus();
	}
	async function deleteSocialLink(socialLinkIndex: number) {
		profileDetailForm.update(($profileDetailForm) => {
			$profileDetailForm.socialLinks = $profileDetailForm.socialLinks.filter(
				(_, idx) => idx !== socialLinkIndex
			);
			return $profileDetailForm;
		});

		profileDetailErrors.update(($profileDetailErrors) => {
			if ($profileDetailErrors?.socialLinks) {
				$profileDetailErrors.socialLinks = undefined;
			}
			return $profileDetailErrors;
		});
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
		enctype="multipart/form-data"
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
					aria-invalid={$profileDetailErrors.email ? 'true' : undefined}
				/>

				{#if $profileDetailErrors.email}
					<ErrorMessage
						errorMessage={$profileDetailErrors.email
							? $profileDetailErrors.email[$profileDetailErrors.email.length - 1]
							: ''}
					/>
				{/if}
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
					aria-invalid={$profileDetailErrors.firstName ? 'true' : undefined}
				/>
				{#if $profileDetailErrors.firstName}
					<ErrorMessage
						errorMessage={$profileDetailErrors.firstName
							? $profileDetailErrors.firstName[$profileDetailErrors.firstName.length - 1]
							: ''}
					/>
				{/if}
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
					aria-invalid={$profileDetailErrors.lastName ? 'true' : undefined}
				/>
				{#if $profileDetailErrors.lastName}
					<ErrorMessage
						errorMessage={$profileDetailErrors.lastName
							? $profileDetailErrors.lastName[$profileDetailErrors.lastName.length - 1]
							: ''}
					/>
				{/if}
			</label>
		</div>
		<div class="flex w-full flex-col px-2 md:max-w-3xl">
			<div class="just flex items-center">
				<h3 class=" self-start">Skill</h3>
				<button type="button" class="variant-filled-success btn btn-sm ml-auto" on:click={addSkill}
					>add skill</button
				>
			</div>
			<ul class="mt-4 flex max-h-[400px] flex-col gap-4 overflow-auto">
				{#each $profileDetailForm.skills as skill, idx (skill.id)}
					<li class="relative flex items-center justify-center gap-4">
						<input
							id={`skillIcon${skill.id}`}
							name="uploadImage"
							type="file"
							class="invisible size-0 opacity-0"
							aria-invalid={$profileDetailErrors.skills &&
							$profileDetailErrors.skills[idx]?.uploadImage
								? true
								: undefined}
							on:input={(e) => (skill.uploadImage = e.currentTarget.files?.item(0))}
						/>
						<button
							id={`skillIconBtn${skill.id}`}
							type="button"
							class="group relative h-12 min-w-12 rounded-full bg-surface-500 p-2 hover:bg-slate-400"
							class:border-2={$profileDetailErrors.skills &&
								$profileDetailErrors.skills[idx]?.uploadImage}
							class:border-primary-500={$profileDetailErrors.skills &&
								$profileDetailErrors.skills[idx]?.uploadImage}
							title={$profileDetailErrors?.skills?.[idx]?.uploadImage?.[0] ?? 'change image'}
							on:click={() => changeSkillImage(skill.id)}
						>
							<RefreshIcon
								class="absolute left-1/2 top-1/2 z-10 hidden size-6 -translate-x-1/2 -translate-y-1/2 text-slate-800 group-hover:block "
							/>
							{#if skill.uploadImage}
								<img
									src={URL.createObjectURL(skill.uploadImage)}
									alt={skill.name}
									class="size-full object-contain group-hover:opacity-30"
								/>
							{:else if skill.image?.url}
								<img
									id={`skillImage${skill.id}`}
									src={skill.image?.url}
									alt={skill.name}
									class="size-full object-contain group-hover:opacity-30"
								/>
							{/if}
						</button>
						<input
							type="text"
							name="name"
							class="input"
							bind:value={skill.name}
							aria-invalid={$profileDetailErrors?.skills?.[idx]?.name ? true : undefined}
							title={$profileDetailErrors?.skills?.[0]?.name?.[0] ?? 'skill name'}
						/>
						<input
							type="text"
							name="link"
							class="input"
							bind:value={skill.link}
							aria-invalid={$profileDetailErrors?.skills?.[idx]?.link ? true : undefined}
							title={$profileDetailErrors?.skills?.[0]?.link?.[0] ?? 'link name'}
						/>
						<input
							type="number"
							step="0.5"
							min="0"
							max="5"
							name="level"
							class="input"
							on:blur={() => {
								if (skill.level <= 0) skill.level = 0.5;
								if (skill.level > 5) skill.level = 5;
								skill.level % 1 > 0.4 && skill.level / 5 < 1
									? (skill.level = Math.floor(skill.level) + 0.5)
									: (skill.level = Math.floor(skill.level));
								return skill.level;
							}}
							bind:value={skill.level}
							aria-invalid={$profileDetailErrors?.skills?.[idx]?.level ? true : undefined}
							title={$profileDetailErrors?.skills?.[0]?.level?.[0] ?? 'level for skill'}
						/>
						<button
							type="button"
							class="variant-ringed-error btn-icon p-2 hover:bg-red-900"
							on:click={() => deleteSkill(idx)}
						>
							<DeleteIcon class="size-6" />
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex w-full flex-col px-2 md:max-w-3xl">
			<div class="just flex items-center">
				<h3 class=" self-start">Social Link</h3>
				<button
					type="button"
					class="variant-filled-success btn btn-sm ml-auto"
					on:click={addSocialLink}>add social link</button
				>
			</div>
			<ul class="mt-4 flex max-h-[400px] flex-col gap-4 overflow-auto">
				{#each $profileDetailForm.socialLinks as socialLink, idx (socialLink.id)}
					<li class="flex items-center justify-center gap-4 pr-[1.1rem]">
						<input
							id={`socialLinkIcon${socialLink.id}`}
							name="uploadImage"
							type="file"
							class="invisible size-0 opacity-0"
							accept=".svg"
							aria-invalid={$profileDetailErrors.socialLinks &&
							$profileDetailErrors.socialLinks[idx]?.uploadImage
								? true
								: undefined}
							on:input={(e) => (socialLink.uploadImage = e.currentTarget.files?.item(0))}
						/>

						<button
							id={`socialLinkIconBtn${socialLink.id}`}
							type="button"
							class="group relative h-12 min-w-12 rounded-full bg-surface-600 p-2 hover:bg-slate-400"
							class:border-2={$profileDetailErrors.socialLinks &&
								$profileDetailErrors.socialLinks[idx]?.uploadImage}
							class:border-primary-500={$profileDetailErrors.socialLinks &&
								$profileDetailErrors.socialLinks[idx]?.uploadImage}
							title={$profileDetailErrors?.socialLinks?.[idx]?.uploadImage?.[0] ?? 'change image'}
							on:click={() => changeSocialImage(socialLink.id)}
						>
							<RefreshIcon
								class="absolute left-1/2 top-1/2 z-10 hidden size-6 -translate-x-1/2 -translate-y-1/2 text-slate-800 group-hover:block "
							/>
							{#if socialLink.uploadImage}
								<img
									src={URL.createObjectURL(socialLink.uploadImage)}
									alt={socialLink.link}
									class="social-icon size-full object-contain group-hover:opacity-30"
								/>
							{:else if socialLink.image?.url}
								<img
									id={`socialLinkImage${socialLink.id}`}
									src={socialLink.image?.url}
									alt={socialLink.link}
									class="social-icon size-full object-contain group-hover:opacity-30"
								/>
							{/if}
						</button>

						<input
							type="text"
							name="link"
							class="input"
							bind:value={socialLink.link}
							aria-invalid={$profileDetailErrors?.socialLinks?.[idx]?.link ? true : undefined}
							title={$profileDetailErrors?.socialLinks?.[0]?.link?.[0] ?? 'link to social media'}
						/>

						<button
							type="button"
							class="variant-ringed-error btn-icon p-2 hover:bg-red-900"
							on:click={() => deleteSocialLink(idx)}
						>
							<DeleteIcon class="size-6" />
						</button>
					</li>
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
