import { Field } from "payload/types";

const NavItem: Field = {
    name: "navItem",
    type: "group",
    fields: [
        {
            name: "label",
            type: "text",
        },
        {
            name: "url",
            type: "text",
        }
    ]
};

export default NavItem;