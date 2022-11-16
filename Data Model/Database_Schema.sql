create database Christmas;
go

use christmas;
go

CREATE TABLE [user] (
  [id] int PRIMARY KEY,
  [username] nvarchar(255) NOT NULL,
  [first_name] nvarchar(255) NOT NULL,
  [last_name] nvarchar(255) NOT NULL,
  [password] nvarchar(255) NOT NULL,
  [mobile] int NOT NULL
)
GO

CREATE TABLE [user_address] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [address_line] nvarchar(255) NOT NULL,
  [city] nvarchar(255) NOT NULL,
  [postal_code] nvarchar(255) NOT NULL,
  [country] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [payments] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [payment_type] nvarchar(255) NOT NULL,
  [account_no] int NOT NULL,
  [expiry] date NOT NULL
)
GO

CREATE TABLE [cart_item] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [session_id] int NOT NULL,
  [product_id] int NOT NULL,
  [quantity] int NOT NULL
)
GO

CREATE TABLE [payment_details] (
  [id] int PRIMARY KEY,
  [order_id] int NOT NULL,
  [amount] int NOT NULL,
  [status] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [orders] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [total] int NOT NULL,
  [payment_id] int NOT NULL
)
GO

CREATE TABLE [order_details] (
  [id] int PRIMARY KEY,
  [order_id] int NOT NULL,
  [product_id] int,
  [amount] int
)
GO

CREATE TABLE [product] (
  [id] int PRIMARY KEY,
  [name] int NOT NULL,
  [desc] nvarchar(255),
  [category_id] int NOT NULL,
  [quantity] int NOT NULL,
  [price] int NOT NULL
)
GO

CREATE TABLE [product_category] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255) NOT NULL,
  [desc] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [user_address] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id])
GO

ALTER TABLE [payments] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id])
GO

ALTER TABLE [cart_item] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([payment_id]) REFERENCES [payment_details] ([id])
GO

ALTER TABLE [product] ADD FOREIGN KEY ([category_id]) REFERENCES [product_category] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id])
GO

ALTER TABLE [cart_item] ADD FOREIGN KEY ([product_id]) REFERENCES [product] ([id])
GO

ALTER TABLE [order_details] ADD FOREIGN KEY ([product_id]) REFERENCES [product] ([id])
GO

ALTER TABLE [order_details] ADD FOREIGN KEY ([order_id]) REFERENCES [orders] ([id])
GO
