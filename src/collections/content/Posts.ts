import { CollectionConfig } from "payload/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import MetaTitle from "../../fields/MetaTitle";
import MetaDescription from "../../fields/MetaDescription";
import slugify from "../../utils/slugify";

const TITLE_MAX_LENGTH = 100;
const EXCERPT_MAX_LENGTH = 160;

const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        group: "Content",
        useAsTitle: "title",
        description: "Create, edit, and delete Posts",
        defaultColumns: ["id", "title", "category", "status", "updatedAt",]
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
            name: "featuredImage",
            type: "upload",
            relationTo: "images",
            localized: true,
        },
        {
            name: "excerpt",
            type: "textarea",
            maxLength: EXCERPT_MAX_LENGTH,
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
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
            required: true,
            admin: {
                position: "sidebar",
            },
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
            name: "publishedOn",
            type: "date",
            admin: {
                position: "sidebar",
                date: {
                    pickerAppearance: "dayAndTime",
                },
            },
            hooks: {
                beforeValidate: [
                    ({ value, siblingData }) => {
                        if (!value && siblingData.status === "published") {
                            value = new Date().toISOString();
                        }
                        return value?.trim().toLowerCase();
                    },
                ],
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

export default Posts;