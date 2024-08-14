import { GlobalConfig } from "payload/types";
import MetaTitle from "../../fields/MetaTitle";
import MetaDescription from "../../fields/MetaDescription";

const General: GlobalConfig = {
    slug: "general",
    label: "General Settings",
    admin: {
        group: "Settings",
    },
    fields: [
        {
            name: "siteTitle",
            type: "text",
            required: true,
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
            name: "siteDescription",
            type: "textarea",
            required: true,
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
            name: "languages",
            type: "text",
            required: true,
            defaultValue: "en",
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        return value?.trim();
                    },
                ],
            },
        },
        {
            name: "copyrightOwner",
            type: "text",
            required: true,
            maxLength: 100,
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        return value?.trim();
                    },
                ],
            },
        },
        MetaTitle,
        MetaDescription,
    ],
};

export default General;