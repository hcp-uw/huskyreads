INSERT INTO Users (username, password, color_scheme) VALUES
    ("elliot", "$2b$10$U41SKHcvR0YnllxQ7bT89eNm0I8iU/uA.PTOPGlb1v.6R2FAfdwRG", "dark");
INSERT INTO Users (username, password) VALUES
    ("frank", "$2b$10$LAwdabZi8jOU7rmzUYqCf.IUW6iZQyorzo8yW8CDf6dZRmtt2stcy"),
    ("nicholas", "$2b$10$pBksFtv4TFV5.B/zSNZIwe695STLrF22brxR6rSh3KlhrHfn1stve"),
    ("vikram", "$2b$10$JQoXT7nX8N6ob7.ubdWPQOhT2xC8N2Fi01YHDpQ.r3Uq2x8VUR.a2"),
    ("john", "$2b$10$oBqv7hZRNQPNh9kegqIz5ut4QwKEmEV14Y7ZQ.YcRIq2bIUk855AW"),
    ("jane", "$2b$10$LUlfZfjO7a/tKjgFRHYU6e.PlWu2l7/H3/1oAjkb/2iDCf4WxGoG6")
;

INSERT INTO Books (ISBN, title, description, date_published) VALUES
    ('0123456789', "title0", "Long Description0", '2020-11-1'),
    ('1111111111', "title1", "Long Description1", '2020-12-1'),
    ('2222222222', "title2", "Long Description2", '2020-12-2'),
    ('3333333333', "title3", "Long Description3", '2020-12-3'),
    ('4444444444', "title4", "Long Description4", '2020-12-4'),
    ('5555555555', "title5", "Long Description5", '2020-12-5'),
    ('6666666666', "title6", "Long Description6", '2020-12-6'),
    ('1111111111111', "title11", "Long Description11", '2020-11-11'),
    ('7777777777777', "title7", "Long Description7", '2020-12-7'),
    ('0888888888888', "title8", "Long Description8", '2020-12-8')
;

INSERT INTO Reviews (ISBN_book, id_user, content, published) VALUES
    ('1111111111', 1, "wow not that bad", CURDATE()),  /* CURDATE() puts in current date */
    ('2222222222', 2, "interesting book!", CURDATE())
;

INSERT INTO Bookshelves (id_user, shelf_name) VALUES
    (1, "reading"),
    (1, "read"),
    (1, "want_to_read"),
    (2, "reading"),
    (2, "read"),
    (2, "want_to_read"),
    (3, "reading"),
    (3, "read"),
    (3, "want_to_read"),
    (4, "reading"),
    (4, "read"),
    (4, "want_to_read"),
    (5, "reading"),
    (5, "read"),
    (5, "want_to_read"),
    (6, "reading"),
    (6, "read"),
    (6, "want_to_read")
;

INSERT INTO Bookshelf_Books (id_bookshelf, ISBN) VALUES
    (1, '1111111111'),
    (2, '1111111111'),
    (1, '2222222222'),
    (3, '3333333333'),
    (1, '4444444444'),
    (6, '5555555555'),
    (9, '1111111111')
;

INSERT INTO Authors (id, name) VALUES
    (1, "Terrence Tao"),
    (2, "Brett Wortmanz"),
    (3, "Foo Bar the Third"),
    (4, "Suzzy Collins"),
    (5, "Albert Einstein"),
    (6, "李涛"),                           /* Testing non-latin characters */
    (7, "Александр Сергеевич Пушкин"),    /* Testing non-latin characters */
    (8, "John Snow")
;

INSERT INTO Genres (name) VALUES
    ("Horror"),
    ("Romance"),
    ("Action"),
    ("Young Adult"),
    ("Thriller"),
    ("Fake Genre")
;

INSERT INTO Book_Authors (ISBN_book, id_author) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
    ('5555555555', 3),  /* Edge Case */
    ('0123456789', 8),
    ('1111111111111', 8),
    ('7777777777777', 8),
    ('0888888888888', 8)
;

INSERT INTO Book_Genres (ISBN_book, id_genre) VALUES
    ('1111111111', 1),
    ('2222222222', 2),
    ('3333333333', 3),
    ('4444444444', 3), /* Edge Case */
    ('5555555555', 5), /* Edge Case */
    ('5555555555', 4), /* Edge Case */
    ('0123456789', 6),
    ('1111111111111', 6),
    ('7777777777777', 6),
    ('0888888888888', 6)
;