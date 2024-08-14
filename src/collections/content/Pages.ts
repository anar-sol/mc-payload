import { CollectionConfig } from "payload/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import MetaTitle from "../../fields/MetaTitle";
import MetaDescription from "../../fields/MetaDescription";
import slugify from "../../utils/slugify";

const TITLE_MAX_LENGTH = 100;

const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        group: "Content",
        useAsTitle: "title",
        description: "Create, edit, and delete Pages",
        defaultColumns: ["id", "title", "status", "updatedAt",]
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            unique: true,
            maxLength: TITLE_MAX_LENGTH,
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        return value?.trim();
                    },
                ],
            },
            localized: true,
        },
        {
            name: "content",
            type: "richText",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => defaultFeatures.filter(({ key }) => [
                        "upload",
                        "relationship",
                        "blockquote",
                        "link",
                        "unorderedList",
                        "orderedList",
                        "heading",
                        "paragraph",
                        "inlineCode",
                        "superscript",
                        "subscript",
                        "italic",
                        "bold"
                    ].includes(key))
            }),
            localized: true,
        },
        {
            name: "status",
            type: "select",
            options: [
                {
                    label: "Draft",
                    value: "draft",
                },
                {
                    label: "Published",
                    value: "published",
                },
                {
                    label: "Archived",
                    value: "archived",
                },

            ],
            defaultValue: "draft",
            required: true,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "slug",
            type: "text",
            unique: true,
            maxLength: TITLE_MAX_LENGTH,
            hooks: {
                beforeValidate: [
                    ({ value, siblingData }) => {
                        if (!value) {
                            return slugify(siblingData.title);
                        }
                    },
                ],
            },
            admin: {
                readOnly: true,
                position: "sidebar",
            },
            localized: true,
        },
        MetaTitle,
        MetaDescription,
    ],
};

export default Pages;