USE [PetsAndPajamas]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customerId] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](20) NOT NULL,
	[lastName] [varchar](20) NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[emailAddress] [varchar](50) NOT NULL,
	[address] [varchar](50) NULL,
	[city] [varchar](40) NULL,
	[state] [char](2) NULL,
	[zipCode] [int] NULL,
	[country] [varchar](40) NULL,
	[phone] [int] NULL,
	[cartId] [int] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[orderId] [int] IDENTITY(1,1) NOT NULL,
	[customerId] [int] NOT NULL,
	[orderDate] [datetime] NOT NULL,
	[shipDate] [datetime] NOT NULL,
	[shipAddress] [varchar](50) NOT NULL,
	[shipCity] [varchar](40) NOT NULL,
	[shipState] [char](2) NOT NULL,
	[shipZip] [int] NOT NULL,
	[shipCountry] [varchar](40) NOT NULL,
	[paymentId] [int] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pajama]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pajama](
	[pajamaId] [int] IDENTITY(1,1) NOT NULL,
	[typeId] [int] NOT NULL,
	[size] [varchar](20) NOT NULL,
	[color] [varchar](20) NOT NULL,
	[pattern] [bit] NOT NULL,
	[price] [int] NOT NULL,
	[description] [varchar](250) NOT NULL,
	[inventory] [int] NOT NULL,
	[title] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Pajama] PRIMARY KEY CLUSTERED 
(
	[pajamaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PajamaOrder]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PajamaOrder](
	[cartId] [int] NOT NULL,
	[pajamaId] [int] NOT NULL,
	[quantity] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PajamaType]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PajamaType](
	[typeId] [int] IDENTITY(1,1) NOT NULL,
	[petType] [varchar](20) NOT NULL,
	[pajamaType] [varchar](40) NOT NULL,
 CONSTRAINT [PK_PajamaType] PRIMARY KEY CLUSTERED 
(
	[typeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentType]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentType](
	[paymentId] [int] IDENTITY(1,1) NOT NULL,
	[paymentType] [varchar](30) NOT NULL,
	[accountNumber] [varchar](40) NOT NULL,
 CONSTRAINT [PK_PaymentType] PRIMARY KEY CLUSTERED 
(
	[paymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShoppingCart]    Script Date: 4/13/2021 7:38:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCart](
	[cartId] [int] IDENTITY(1,1) NOT NULL,
	[totalCost] [int] NOT NULL,
 CONSTRAINT [PK_ShoppingCart] PRIMARY KEY CLUSTERED 
(
	[cartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Customer]  WITH CHECK ADD  CONSTRAINT [FK_Customer_ShoppingCart] FOREIGN KEY([cartId])
REFERENCES [dbo].[ShoppingCart] ([cartId])
GO
ALTER TABLE [dbo].[Customer] CHECK CONSTRAINT [FK_Customer_ShoppingCart]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Customer] FOREIGN KEY([customerId])
REFERENCES [dbo].[Customer] ([customerId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Customer]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_PaymentType] FOREIGN KEY([paymentId])
REFERENCES [dbo].[PaymentType] ([paymentId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_PaymentType]
GO
ALTER TABLE [dbo].[Pajama]  WITH CHECK ADD  CONSTRAINT [FK_Pajama_PajamaType] FOREIGN KEY([typeId])
REFERENCES [dbo].[PajamaType] ([typeId])
GO
ALTER TABLE [dbo].[Pajama] CHECK CONSTRAINT [FK_Pajama_PajamaType]
GO
ALTER TABLE [dbo].[PajamaOrder]  WITH CHECK ADD  CONSTRAINT [FK_PajamaOrder_Pajama] FOREIGN KEY([pajamaId])
REFERENCES [dbo].[Pajama] ([pajamaId])
GO
ALTER TABLE [dbo].[PajamaOrder] CHECK CONSTRAINT [FK_PajamaOrder_Pajama]
GO
ALTER TABLE [dbo].[PajamaOrder]  WITH CHECK ADD  CONSTRAINT [FK_PajamaOrder_ShoppingCart] FOREIGN KEY([cartId])
REFERENCES [dbo].[ShoppingCart] ([cartId])
GO
ALTER TABLE [dbo].[PajamaOrder] CHECK CONSTRAINT [FK_PajamaOrder_ShoppingCart]
GO
