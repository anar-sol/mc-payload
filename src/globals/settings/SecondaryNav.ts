import { GlobalConfig } from "payload/types";
import NavItem from "../../fields/NavItem";

const SecondaryNav: GlobalConfig = {
    slug: "secondary-nav",
    label: "Secondary Navigation",
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

export default SecondaryNav;