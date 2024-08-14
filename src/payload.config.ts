import path from 'path'

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'

import Categories from './collections/content/Categories'
import Images from './collections/content/Images'
import Videos from './collections/content/Videos'
import Posts from './collections/content/Posts'
import Pages from './collections/content/Pages'

import General from './globals/settings/General'
import MainNav from './globals/settings/MainNav'
import SecondaryNav from './globals/settings/SecondaryNav'
import SocialMedia from './globals/settings/SocialMedia'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => defaultFeatures.filter(({ key }) => [
      "upload",
      "relationship",
      "blockquote",
      "link",
      "unorderedList",
      "orderedList",
      "heading",
      "paragraph",
      "inlineCode",
      "superscript",
      "subscript",
      "italic",
      "bold"
    ].includes(key))
  }),
  collections: [Posts, Pages, Images, Videos, Categories, Users],
  globals: [General, MainNav, SecondaryNav, SocialMedia],
  localization: {
    locales: [
      {
        code: "en",
        label: "English"
      },
      {
        code: "fr",
        label: "French",
        fallbackLocale: "en"
      }
    ],
    defaultLocale: "en",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
