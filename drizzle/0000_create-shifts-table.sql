CREATE TABLE `shifts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`hours` real DEFAULT 0 NOT NULL,
	`tips` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT "hours_check" CHECK("shifts"."hours" >= 0.5 AND "shifts"."hours" <= 24),
	CONSTRAINT "tips_check" CHECK("shifts"."tips" >= 0)
);
