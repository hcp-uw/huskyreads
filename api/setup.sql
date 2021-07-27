CREATE TABLE `Authors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Authors` ADD PRIMARY KEY `authors_id_primary`(`id`);
CREATE TABLE `Books_Authors`(
    `ISBN_book` INT UNSIGNED NOT NULL,
    `id_author` INT NOT NULL
);
CREATE TABLE `Reviews (LATER)`(
    `id_review` INT NOT NULL AUTO_INCREMENT,
    `id_book` INT UNSIGNED NOT NULL,
    `author` VARCHAR(255) NULL,
    `content` VARCHAR(255) NOT NULL,
    `published` DATE NOT NULL
);
ALTER TABLE
    `Reviews (LATER)` ADD PRIMARY KEY `reviews (later)_id_review_primary`(`id_review`);
CREATE TABLE `Genre`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Genre` ADD PRIMARY KEY `genre_id_primary`(`id`);
CREATE TABLE `Book_Genre`(
    `ISBN_book` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_genre` INT NOT NULL
);
CREATE TABLE `Books`(
    `id_book` INT NOT NULL AUTO_INCREMENT,
    `ISBN` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `date_published` DATE NOT NULL
);
ALTER TABLE
    `Books` ADD PRIMARY KEY `books_id_book_primary`(`id_book`);
ALTER TABLE
    `Books` ADD UNIQUE `books_isbn_unique`(`ISBN`);
CREATE TABLE `Bookshelf`(
    `id_user` INT UNSIGNED NOT NULL,
    `id_books` INT NOT NULL,
    `shelf_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `User`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `color_scheme` VARCHAR(255) NOT NULL COMMENT 'Default should be \"light\"'
);
ALTER TABLE
    `User` ADD PRIMARY KEY `user_id_primary`(`id`);
ALTER TABLE
    `User` ADD UNIQUE `user_username_unique`(`username`);
ALTER TABLE
    `Book_Genre` ADD CONSTRAINT `book_genre_id_genre_foreign` FOREIGN KEY(`id_genre`) REFERENCES `Genre`(`id`);
ALTER TABLE
    `Bookshelf` ADD CONSTRAINT `bookshelf_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `User`(`id`);
ALTER TABLE
    `Bookshelf` ADD CONSTRAINT `bookshelf_id_books_foreign` FOREIGN KEY(`id_books`) REFERENCES `Books`(`id_book`);
ALTER TABLE
    `Books_Authors` ADD CONSTRAINT `books_authors_id_author_foreign` FOREIGN KEY(`id_author`) REFERENCES `Authors`(`id`);