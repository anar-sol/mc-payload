import { CollectionConfig } from "payload/types";

const Images: CollectionConfig = {
    slug: "images",
    access: {
        read: () => true,
    },
    admin: {
        group: "Content",
        useAsTitle: "filename",
        description: "Manage, upload, edit, and delete images.",
        defaultColumns: ["id", "filename", "alt", "caption"],
    },
    upload: {
        staticURL: "/images",
        staticDir: "../images",
        crop: false,
        focalPoint: false,
        mimeTypes: ["image/*"],
        formatOptions: {
            format: "jpeg",
        },
        resizeOptions: {
            width: 4096,
            withoutEnlargement: true,
        },
    },
    fields: [
        {
            name: "alt",
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

export default Images;
