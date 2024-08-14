import { Field } from "payload/types";

const META_TITLE_MAX_LENGTH = 100;

const MetaTitle: Field = {
    name: "metaTitle",
    type: "text",
    maxLength: META_TITLE_MAX_LENGTH,
    hooks: {
        beforeValidate: [
            ({ value }) => {
                return value?.trim();
            },
        ],
    },
    localized: true,
    admin: {
        position: "sidebar",
    },
}

export default MetaTitle;
