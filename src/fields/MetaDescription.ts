import { Field } from "payload/types";

const META_DESCRIPTION_MAX_LENGTH = 160;

const MetaDescription: Field = {
    name: "metaDescription",
    type: "textarea",
    maxLength: META_DESCRIPTION_MAX_LENGTH,
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
};

export default MetaDescription;
