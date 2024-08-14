import slugify from "slugify";

export default function (str: string): string {
    return slugify(str, {
        lower: true,
    });
};
