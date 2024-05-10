import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { put, del } from '@vercel/blob';
import superFormFilesToStructuredObject from '$lib/helper/superFormFilesToStructuredObject';
import type ISkill from '$lib/types/ISkill';
import type ISocialLink from '$lib/types/ISocialLink';
import type IUser from '$lib/types/IUser';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();

	//? get file entries from superForm
	const uploadFilesObject = superFormFilesToStructuredObject(formData);

	const data = (await JSON.parse(formData.get('data') as string)) as IUser;

	if (uploadFilesObject?.uploadImage?.skills) {
		Object.keys(uploadFilesObject.uploadImage.skills).forEach((index) => {
			data.skills[+index].uploadImage = uploadFilesObject.uploadImage.skills[+index];
		});
	}

	if (uploadFilesObject?.uploadImage?.socialLinks) {
		Object.keys(uploadFilesObject.uploadImage.socialLinks).forEach((index) => {
			data.socialLinks[+index].uploadImage = uploadFilesObject.uploadImage.socialLinks[+index];
		});
	}

	const { skills, socialLinks, ...restData } = data;

	const { id, ...profileData } = restData;

	const [profileUpdated, skillsUpdated, socialLinksUpdated] = await Promise.all([
		updateMainProfile(id, profileData),
		updateSkills(id, skills),
		updateSocialLinks(id, socialLinks)
	]);

	const updatedData = { ...profileUpdated, skills: skillsUpdated, socialLinks: socialLinksUpdated };

	return new Response(JSON.stringify({ ...updatedData }));
};

type ProfileData = {
	image: {
		id: number;
		userId: number;
		url: string;
		isActive: boolean;
	};
	resume: {
		id: number;
		userId: number;
		url: string;
		isActive: boolean;
	};
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
};

const updateMainProfile = async (userId: number, profileData: ProfileData) => {
	return await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			firstName: profileData.firstName,
			lastName: profileData.lastName,
			email: profileData.email
		}
	});
};

const updateSkills = async (userId: number, skills: ISkill[]) => {
	//const skillToCreate = skills.filter((skill) => skill.image == null);
	// const skillToUpdate = skills.filter((skill) => skill.image != null);
	// skillToUpdate.map(async (skill) => {
	// 	if (skill.uploadImage !== null && skill.uploadImage !== undefined) {
	// 		await del(skill.image.url);

	// 		const blobResponse = await put(
	// 			`skill/${userId}/${skill.uploadImage.name}`,
	// 			skill.uploadImage,
	// 			{
	// 				access: 'public'
	// 			}
	// 		);
	// 		skill.image.url = blobResponse.url;
	// 	}
	// });

	// skillToCreate.forEach(async (skill) => {
	// 	if (skill.uploadImage == null || skill.uploadImage == undefined) {
	// 		return;
	// 	}
	// 	const blobResponse = await put(
	// 		`skill/${userId}/${skill.uploadImage.name}`,
	// 		skill.uploadImage,
	// 		{
	// 			access: 'public'
	// 		}
	// 	);
	// 	skill.image = {
	// 		id: 0,
	// 		skillId: 0,
	// 		url: blobResponse.url,
	// 		isActive: true
	// 	};
	// });

	const [skillToUpdate, skillToCreate] = await Promise.all([
		Promise.all(
			skills
				.filter((skill) => skill.image != null)
				.flatMap(async (skill) => {
					if (skill.uploadImage !== null && skill.uploadImage !== undefined) {
						if (skill?.image?.url) {
							await del(skill.image.url);
							const blobResponse = await put(
								`skill/${userId}/${skill.uploadImage.name}`,
								skill.uploadImage,
								{ access: 'public' }
							);
							skill.image.url = blobResponse.url;
						}
						return skill; // Return the updated skill object
					}
					return skill; // Return the original skill object if no update is needed
				})
		),
		Promise.all(
			skills
				.filter((skill) => skill.image == null)
				.flatMap(async (skill) => {
					if (skill.uploadImage !== null && skill.uploadImage !== undefined) {
						const blobResponse = await put(
							`skill/${userId}/${skill.uploadImage.name}`,
							skill.uploadImage,
							{ access: 'public' }
						);
						skill.image = {
							id: 0,
							skillId: 0,
							url: blobResponse.url,
							isActive: true
						};
						return skill; // Return the updated skill object
					}
					return skill; // Return the original skill object if no update is needed
				})
		)
	]);

	//delete all skills image that are not in the updated list
	await prisma.skill
		.findMany({
			include: {
				image: true
			},
			where: {
				userId: userId
			}
		})
		.then(async (skills) => {
			skills.forEach(async (dbSkill) => {
				skillToUpdate
					.filter((skill) => skill.id === dbSkill.id)
					.forEach(async (skill) => {
						if (dbSkill.image && skill.image) {
							if (dbSkill.image.url !== skill.image.url) {
								await del(dbSkill.image.url);
							}
						}
					});
			});
		});

	//delete all skills that are not in the updated list
	await prisma.skill.deleteMany({
		where: {
			userId: userId,
			id: {
				notIn: skillToUpdate.map((skill) => skill.id)
			},
			image: {
				skillId: {
					notIn: skillToUpdate.map((skill) => skill.id)
				}
			}
		}
	});

	const skillsUpdated = await Promise.all(
		skillToUpdate.map(async (skill) => {
			const skillUpdated = await prisma.skill.update({
				where: {
					id: skill.id,
					userId: userId
				},
				include: {
					image: true
				},
				data: {
					name: skill.name,
					link: skill.link,
					level: skill.level,
					image: {
						update: {
							url: skill?.image?.url ?? 'https://placehold.co/150'
						}
					}
				}
			});
			return skillUpdated;
		})
	);
	let skillsCreated: ISkill[] = [];
	if (skillToCreate.length > 0) {
		skillsCreated = await Promise.all(
			skillToCreate.map(async (skill) => {
				const skillCreated = await prisma.skill.create({
					include: {
						image: true
					},
					data: {
						name: skill.name,
						link: skill.link,
						level: skill.level,
						userId: userId,
						image: {
							create: {
								url: skill?.image?.url ?? 'https://placehold.co/150'
							}
						}
					}
				});
				return skillCreated;
			})
		);
	}

	return [...skillsUpdated, ...skillsCreated];
};

const updateSocialLinks = async (userId: number, socialLinks: ISocialLink[]) => {
	// const socialLinkToUpdate = socialLinks.filter((socialLink) => socialLink.image != null);
	// const socialLinkToCreate = socialLinks.filter((socialLink) => socialLink.image == null);

	// socialLinkToUpdate.forEach(async (socialLink) => {
	// 	if (socialLink.uploadImage == null || socialLink.uploadImage == undefined) {
	// 		return;
	// 	}
	// 	await del(socialLink.image.url);

	// 	const blobResponse = await put(
	// 		`socialLink/${userId}/${socialLink.uploadImage.name}`,
	// 		socialLink.uploadImage,
	// 		{
	// 			access: 'public'
	// 		}
	// 	);
	// 	socialLink.image.url = blobResponse.url;
	// });

	// socialLinkToCreate.forEach(async (socialLink) => {
	// 	if (socialLink.uploadImage == null || socialLink.uploadImage == undefined) {
	// 		return;
	// 	}
	// 	const blobResponse = await put(
	// 		`socialLink/${userId}/${socialLink.uploadImage.name}`,
	// 		socialLink.uploadImage,
	// 		{
	// 			access: 'public'
	// 		}
	// 	);
	// 	socialLink.image = {
	// 		id: 0,
	// 		socialLinkId: 0,
	// 		url: blobResponse.url,
	// 		isActive: true
	// 	};
	// });

	const [socialLinkToUpdate, socialLinkToCreate] = await Promise.all([
		Promise.all(
			socialLinks
				.filter((socialLink) => socialLink.image != null)
				.flatMap(async (socialLink) => {
					if (socialLink.uploadImage !== null && socialLink.uploadImage !== undefined) {
						if (socialLink?.image?.url) {
							await del(socialLink.image.url);
							const blobResponse = await put(
								`social/${userId}/${socialLink.uploadImage.name}`,
								socialLink.uploadImage,
								{ access: 'public' }
							);
							socialLink.image.url = blobResponse.url;
						}
						return socialLink; // Return the updated skill object
					}
					return socialLink; // Return the original skill object if no update is needed
				})
		),
		Promise.all(
			socialLinks
				.filter((socialLink) => socialLink.image == null)
				.flatMap(async (socialLink) => {
					if (socialLink.uploadImage !== null && socialLink.uploadImage !== undefined) {
						const blobResponse = await put(
							`social/${userId}/${socialLink.uploadImage.name}`,
							socialLink.uploadImage,
							{ access: 'public' }
						);
						socialLink.image = {
							id: 0,
							socialLinkId: 0,
							url: blobResponse.url,
							isActive: true
						};
						return socialLink; // Return the updated skill object
					}
					return socialLink; // Return the original skill object if no update is needed
				})
		)
	]);

	//delete all social image that are not in the updated list
	await prisma.socialLink
		.findMany({
			include: {
				image: true
			},
			where: {
				userId: userId
			}
		})
		.then(async (socialLinks) => {
			socialLinks.forEach(async (dbSocialLink) => {
				socialLinkToUpdate
					.filter((socialLink) => socialLink.id === dbSocialLink.id)
					.forEach(async (socialLink) => {
						if (dbSocialLink.image && socialLink.image) {
							if (dbSocialLink.image.url !== socialLink.image.url) {
								await del(dbSocialLink.image.url);
							}
						}
					});
			});
		});

	//delete all social that are not in the updated list
	await prisma.socialLink.deleteMany({
		where: {
			userId: userId,
			id: {
				notIn: socialLinkToUpdate.map((socialLink) => socialLink.id)
			},
			image: {
				socialLinkId: {
					notIn: socialLinkToUpdate.map((socialLink) => socialLink.id)
				}
			}
		}
	});

	const socialLinksUpdated = await Promise.all(
		socialLinkToUpdate.map(async (socialLink) => {
			const socialLinkUpdated = await prisma.socialLink.update({
				where: {
					id: socialLink.id,
					userId: userId
				},
				include: {
					image: true
				},
				data: {
					link: socialLink.link,
					image: {
						update: {
							url: socialLink?.image?.url ?? 'https://placehold.co/150'
						}
					}
				}
			});
			return socialLinkUpdated;
		})
	);

	let socialLinksCreated: ISocialLink[] = [];
	if (socialLinkToCreate.length > 0) {
		socialLinksCreated = await Promise.all(
			socialLinkToCreate.map(async (socialLink) => {
				const socialLinkCreated = await prisma.socialLink.create({
					include: {
						image: true
					},
					data: {
						link: socialLink.link,
						userId: userId,
						image: {
							create: {
								url: socialLink?.image?.url ?? 'https://placehold.co/150'
							}
						}
					}
				});
				return socialLinkCreated;
			})
		);
	}

	return [...socialLinksUpdated, ...socialLinksCreated];
};
