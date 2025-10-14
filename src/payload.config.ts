import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { type SharpDependency, buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";

import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		autoLogin:
			process.env.PAYLOAD_AUTO_LOGIN === "true"
				? {
						email: process.env.PAYLOAD_AUTO_LOGIN_EMAIL || "admin@localhost",
						password: process.env.PAYLOAD_AUTO_LOGIN_PASSWORD || "admin",
						prefillOnly: true,
					}
				: undefined,
	},
	collections: [Users, Media, Projects],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_DATABASE_URL || "",
		},
	}),
	sharp: sharp as unknown as SharpDependency,
	plugins: [
		vercelBlobStorage({
			enabled: true,
			collections: { media: true },
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
});
