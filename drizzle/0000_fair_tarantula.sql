CREATE TABLE `users` (
	`id` bigint unsigned NOT NULL,
	`hashed_password` varchar(255),
	`slug` varchar(255) NOT NULL,
	`unsubscribe_token` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`bio` text,
	`language` enum('en','fr','nl') DEFAULT 'en',
	`banner_url` varchar(255),
	`thumbnail_url` varchar(255),
	`newsletter` boolean NOT NULL DEFAULT false,
	`last_seen_at` timestamp,
	`last_visit_at` timestamp,
	`last_sign_in_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`modified_at` timestamp,
	`modified_by` bigint unsigned,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `users_unsubscribe_token_unique` UNIQUE(`unsubscribe_token`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_modified_by_users_id_fk` FOREIGN KEY (`modified_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `users_name_index` ON `users` (`name`);--> statement-breakpoint
CREATE INDEX `users_token_index` ON `users` (`unsubscribe_token`);--> statement-breakpoint
CREATE INDEX `users_email_index` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_created_at_index` ON `users` (`created_at`);