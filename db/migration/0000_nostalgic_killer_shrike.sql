CREATE TABLE `deletion_request` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`phrase` text NOT NULL,
	`date` numeric NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `deletion_request_date_unique` ON `deletion_request` (`date`);