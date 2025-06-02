import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
	slug: 'projects',
	admin: { useAsTitle: 'name' },
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'name',
					type: 'text',
					admin: { width: '50%' },
					required: true,
				},
				{
					name: 'url',
					type: 'text',
					admin: { width: '50%' },
					required: true,
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'type',
					type: 'select',
					options: [
						{ label: 'Web', value: 'web' },
						{ label: 'Tool', value: 'tool' },
						{ label: 'Other', value: 'other' },
					],
					admin: { width: '50%' },
					required: true,
				},
				{
					name: 'year',
					type: 'text',
					admin: { width: '50%' },
					required: true,
				},
			],
		},
	],
}
