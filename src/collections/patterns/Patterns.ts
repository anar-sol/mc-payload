import { CollectionConfig } from "payload/types";

const Patterns: CollectionConfig = {
    slug: "patterns",
    admin: {
        group: "patterns",
        useAsTitle: "title",
        description: "Create, edit, and delete Etsy patterns",
        defaultColumns: ["id", "title", "url"]
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
    ],
};

export default Patterns;
