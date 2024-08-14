import { GlobalConfig } from "payload/types";
import NavItem from "../../fields/NavItem";

const MainNav: GlobalConfig = {
    slug: "main-nav",
    label: "Main Navigation",
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
        {
            ...NavItem, ...{ name: "cta", label: "Call to action"}
        }
    ],
};

export default MainNav;