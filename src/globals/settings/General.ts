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