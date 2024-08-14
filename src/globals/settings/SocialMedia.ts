import { GlobalConfig } from "payload/types";
import NavItem from "../../fields/NavItem";

const SocialMedia: GlobalConfig = {
    slug: "social-media",
    admin: {
        group: "Settings",
    },
    fields: [
        {
            name: "items",
            type: "array",
            fields: [
                NavItem,
            ],
        },
    ],
};

export default SocialMedia;