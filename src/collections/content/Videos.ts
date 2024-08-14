import { CollectionConfig } from "payload/types";

const Videos: CollectionConfig = {
    slug: "videos",
    admin: {
        group: "Content",
        useAsTitle: "title",
        description: "Create, edit, and delete Youtube videos",
        defaultColumns: ["id", "title", "caption", "url"]
    },
    fields: [
        {
            name: "title",
            type: "text",
            maxLength: 100,
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
            name: "url",
            type: "text",
            required: true,
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
            name: "caption",
            type: "text",
            maxLength: 160,
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        return value?.trim();
                    },
                ],
            },
            localized: true,
        },
    ],
};

export default Videos;
