import { Media } from "@/components/layout";
import type { Project } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { ComponentProps, FC } from "react";

type LayoutBlock = NonNullable<Project["layout"]>[number];

interface IProjectBlocksProps extends ComponentProps<"section"> {
	blocks: LayoutBlock[];
}

export const ProjectBlocks: FC<IProjectBlocksProps> = ({ blocks, ...props }) => {
	if (!blocks.length) return null;

	return (
		<section {...props}>
			{blocks.map((block) => {
				switch (block.blockType) {
					case "richText":
						return <RichTextBlock key={block.id} block={block} />;
					case "image":
						return <ImageBlock key={block.id} block={block} />;
					case "imageGrid":
						return <ImageGridBlock key={block.id} block={block} />;
					default:
						return null;
				}
			})}
		</section>
	);
};

type BlockOfType<T extends LayoutBlock["blockType"]> = Extract<LayoutBlock, { blockType: T }>;

const RichTextBlock: FC<{ block: BlockOfType<"richText"> }> = ({ block }) => {
	return (
		<div className="layout-grid py-12">
			<div className="col-span-2 text-caption md:col-start-3 xl:col-start-4">
				<h3 className="w-fit bg-foreground px-1 py-px text-background" aria-label={block.title}>
					{block.title}
				</h3>
			</div>
			<div className="col-span-full col-start-4 text-caption md:col-span-6 xl:col-span-4 xl:col-start-6">
				<RichText data={block.content} />
			</div>
		</div>
	);
};

const ImageBlock: FC<{ block: BlockOfType<"image"> }> = ({ block }) => {
	const isHalf = block.size === "half";

	return (
		<figure className="layout-grid py-12">
			<div className={isHalf ? "col-span-full md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4" : "col-span-full"}>
				<Media resource={block.image} className="w-full" imgClassName="w-full" />
				{block.caption && <figcaption className="mt-2 text-caption text-foreground-muted">{block.caption}</figcaption>}
			</div>
		</figure>
	);
};

const ImageGridBlock: FC<{ block: BlockOfType<"imageGrid"> }> = ({ block }) => {
	if (!block.images?.length) return null;

	const count = block.images.length;
	const colSpan = count === 2 ? "col-span-full md:col-span-6" : count === 3 ? "col-span-4" : "col-span-3";

	return (
		<div className="layout-grid gap-y-4 py-12">
			{block.images.map((item) => (
				<figure key={item.id} className={colSpan}>
					<Media resource={item.image} className="w-full" imgClassName="w-full" />
					{item.caption && <figcaption className="mt-2 text-caption text-foreground-muted">{item.caption}</figcaption>}
				</figure>
			))}
		</div>
	);
};
