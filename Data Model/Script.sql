-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- christmas.dbo.geo_details definition

-- Drop table

-- DROP TABLE christmas.dbo.geo_details;

CREATE TABLE christmas.dbo.geo_details (
	id int IDENTITY(1,1) NOT NULL,
	postal_code nvarchar(7) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	city nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	province nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__geo_deta__3213E83F917E4A78 PRIMARY KEY (id)
);


-- christmas.dbo.product_category definition

-- Drop table

-- DROP TABLE christmas.dbo.product_category;

CREATE TABLE christmas.dbo.product_category (
	id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[desc] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__product___3213E83FCB087FBE PRIMARY KEY (id)
);


-- christmas.dbo.user_data definition

-- Drop table

-- DROP TABLE christmas.dbo.user_data;

CREATE TABLE christmas.dbo.user_data (
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	first_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	last_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	password nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	email nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	mobile bigint NULL,
	CONSTRAINT PK__user_dat__F3DBC5736A6A1BE0 PRIMARY KEY (username)
);


-- christmas.dbo.payment_details definition

-- Drop table

-- DROP TABLE christmas.dbo.payment_details;

CREATE TABLE christmas.dbo.payment_details (
	id int IDENTITY(1,1) NOT NULL,
	transaction_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	amount int NOT NULL,
	status nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	card_number nvarchar(16) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	cvv nvarchar(3) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	expiry nvarchar(7) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	card_type nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name_on_card nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__payment___3213E83FE29ABF28 PRIMARY KEY (id),
	CONSTRAINT payment_details_FK FOREIGN KEY (username) REFERENCES christmas.dbo.user_data(username)
);


-- christmas.dbo.product definition

-- Drop table

-- DROP TABLE christmas.dbo.product;

CREATE TABLE christmas.dbo.product (
	id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[desc] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[image] nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	quantity int NOT NULL,
	price int NOT NULL,
	CONSTRAINT PK__product__3213E83F15FC58A5 PRIMARY KEY (id),
	CONSTRAINT FK__product__categor__36B12243 FOREIGN KEY (category_id) REFERENCES christmas.dbo.product_category(id)
);


-- christmas.dbo.user_address definition

-- Drop table

-- DROP TABLE christmas.dbo.user_address;

CREATE TABLE christmas.dbo.user_address (
	id int IDENTITY(1,1) NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	mobile bigint NULL,
	flat_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	province nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	street_address nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	city nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	postal_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	country nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__user_add__3213E83F5A0369A8 PRIMARY KEY (id),
	CONSTRAINT FK__user_addr__usern__33D4B598 FOREIGN KEY (username) REFERENCES christmas.dbo.user_data(username)
);


-- christmas.dbo.cart_item definition

-- Drop table

-- DROP TABLE christmas.dbo.cart_item;

CREATE TABLE christmas.dbo.cart_item (
	id int IDENTITY(1,1) NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	session_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	product_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__cart_ite__3213E83F6B952336 PRIMARY KEY (id),
	CONSTRAINT FK__cart_item__produ__38996AB5 FOREIGN KEY (product_id) REFERENCES christmas.dbo.product(id),
	CONSTRAINT FK__cart_item__usern__34C8D9D1 FOREIGN KEY (username) REFERENCES christmas.dbo.user_data(username)
);


-- christmas.dbo.orders definition

-- Drop table

-- DROP TABLE christmas.dbo.orders;

CREATE TABLE christmas.dbo.orders (
	id int IDENTITY(1,1) NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	total int NOT NULL,
	payment_id int NOT NULL,
	order_date nvarchar(30) NOT NULL,
	CONSTRAINT PK__orders__3213E83FA632D9A6 PRIMARY KEY (id),
	CONSTRAINT FK__orders__username__37A5467C FOREIGN KEY (username) REFERENCES christmas.dbo.user_data(username),
	CONSTRAINT orders_FK FOREIGN KEY (payment_id) REFERENCES christmas.dbo.payment_details(id)
);


-- christmas.dbo.order_details definition

-- Drop table

-- DROP TABLE christmas.dbo.order_details;

CREATE TABLE christmas.dbo.order_details (
	id int IDENTITY(1,1) NOT NULL,
	order_id int NOT NULL,
	product_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	amount int NULL,
	quantity int NULL,
	CONSTRAINT PK__order_de__3213E83F220C8AD9 PRIMARY KEY (id),
	CONSTRAINT FK__order_det__order__3A81B327 FOREIGN KEY (order_id) REFERENCES christmas.dbo.orders(id),
	CONSTRAINT FK__order_det__produ__398D8EEE FOREIGN KEY (product_id) REFERENCES christmas.dbo.product(id)
);
