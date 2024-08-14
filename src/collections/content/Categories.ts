import { CollectionConfig } from "payload/types";
import MetaTitle from "../../fields/MetaTitle";
import MetaDescription from "../../fields/MetaDescription";
import slugify from "../../utils/slugify";

const NAME_MAX_LENGTH = 25;

const Categories: CollectionConfig = {
    slug: "categories",
    admin: {
        group: "Content",
        useAsTitle: "name",
        description: "Manage, create, edit, and delete post categories.",
        defaultColumns: ["id", "name", "slug"],
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            unique: true,
            maxLength: NAME_MAX_LENGTH,
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
            name: "slug",
            type: "text",
            unique: true,
            maxLength: NAME_MAX_LENGTH,
            admin: {
                readOnly: true,
                position: "sidebar",
            },
            hooks: {
                beforeValidate: [
                    ({ value, siblingData }) => {
                        if (!value) {
                            return slugify(siblingData.name);
                        }
                    },
                ],
            },
            localized: true,
        },
        MetaTitle,
        MetaDescription,
    ],
};

export default Categories;
