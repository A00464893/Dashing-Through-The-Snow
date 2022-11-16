create database Christmas;
go

use Christmas;
go



CREATE TABLE [user] (
  [id] int PRIMARY KEY,
  [username] nvarchar(255) NOT NULL,
  [first_name] nvarchar(255) NOT NULL,
  [last_name] nvarchar(255) NOT NULL,
  [password] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [user_address] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [mobile] int NOT NULL,
  [flat_no] nvarchar(255) NOT NULL,
  [building_name] nvarchar(255) NOT NULL,
  [street_address] nvarchar(255) NOT NULL,
  [city] nvarchar(255) NOT NULL,
  [postal_code] nvarchar(255) NOT NULL,
  [country] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [cart_item] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [session_id] nvarchar(255),
  [product_id] int NOT NULL,
  [quantity] int NOT NULL
)
GO

CREATE TABLE [payment_details] (
  [id] int PRIMARY KEY,
  [order_id] int NOT NULL,
  [transaction_id] nvarchar(255) NOT NULL,
  [user_id] int NOT NULL,
  [payment_type] nvarchar(255) NOT NULL,
  [amount] int NOT NULL,
  [status] bit NOT NULL
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
  [image] varbinary,
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

ALTER TABLE [payment_details] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id])
GO

ALTER TABLE [payment_details] ADD FOREIGN KEY ([order_id]) REFERENCES [orders] ([id])
GO
