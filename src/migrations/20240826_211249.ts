import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "patterns" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "patterns_locales" (
	"title" varchar,
	"url" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "patterns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

ALTER TABLE "posts_rels" ADD COLUMN "patterns_id" integer;
CREATE INDEX IF NOT EXISTS "patterns_created_at_idx" ON "patterns" ("created_at");
DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_patterns_fk" FOREIGN KEY ("patterns_id") REFERENCES "patterns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "patterns_locales" ADD CONSTRAINT "patterns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "patterns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "patterns";
DROP TABLE "patterns_locales";
ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_patterns_fk";

ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "patterns_id";`);

};
