import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'

export const getProjects = cache(async () => {
	const payload = await getPayload({ config })

	const { docs } = await payload.find({
		collection: 'projects',
		sort: '-year',
	})

	return docs
})
