import { revalidatePath, revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "active",
			type: "checkbox",
			admin: { position: "sidebar" },
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			required: true,
			admin: { position: "sidebar" },
		},
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					admin: { width: "50%" },
					required: true,
				},
				{
					name: "url",
					type: "text",
					admin: { width: "50%" },
					required: true,
				},
			],
		},
		{
			type: "upload",
			name: "image",
			relationTo: "media",
		},
		{
			type: "text",
			name: "copyright",
		},
		{
			type: "row",
			fields: [
				{
					name: "awards",
					type: "select",
					hasMany: true,
					admin: { width: "50%" },
					options: [
						{
							label: "HR",
							value: "hr",
						},
						{
							label: "SOTD",
							value: "sotd",
						},
						{
							label: "SOTM",
							value: "sotm",
						},
						{
							label: "SOTY",
							value: "soty",
						},
					],
				},
			],
		},
		{
			name: "services",
			type: "select",
			hasMany: true,
			options: [
				{
					label: "DEV",
					value: "dev",
				},
				{
					label: "DESIGN",
					value: "design",
				},
				{
					label: "INFRA",
					value: "infra",
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "type",
					type: "select",
					options: [
						{ label: "Web", value: "web" },
						{ label: "Tool", value: "tool" },
						{ label: "Other", value: "other" },
					],
					admin: { width: "50%" },
					required: true,
				},
				{
					name: "year",
					type: "text",
					admin: { width: "50%" },
					required: true,
				},
			],
		},
	],
	hooks: {
		afterChange: [
			async ({ doc }) => {
				revalidatePath("/");
				revalidateTag("projects");
				if (doc.slug) {
					revalidatePath(`/p/${doc.slug}`);
					revalidateTag(`project:${doc.slug}`);
				}
			},
		],
		afterDelete: [
			async ({ doc }) => {
				revalidatePath("/");
				revalidateTag("projects");
				if (doc.slug) {
					revalidatePath(`/p/${doc.slug}`);
					revalidateTag(`project:${doc.slug}`);
				}
			},
		],
	},
};
