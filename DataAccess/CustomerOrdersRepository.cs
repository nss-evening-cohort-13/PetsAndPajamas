using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace PetsAndPajamas.DataAccess
{
    public class CustomerOrdersRepository
    {
        readonly string ConnectionString;

        public CustomerOrdersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PetsAndPajamas");
        }

        //Gets all customer orders
        public IEnumerable<CartInfo> GetAll()
        {
            var sql = @"select
	                        co.Id as OrderId,
	                        co.OrderDate as NewOrderDate,
	                        co.ShipDate as NewShipDate,
	                        co.ShipAddress as NewShipAddress,
	                        co.ShipCity as NewShipCity,
	                        co.ShipState as NewShipState,
	                        co.ShipZip as NewShipZip,
	                        co.ShipCountry as NewShipCountry,
	                        co.TotalCost as OrderTotalCost,
	                        su.Id as UserId, 
	                        su.FirstName as UserFirstName, 
	                        su.LastName as UserLastName, 
	                        su.EmailAddress as UserEmailAddress, 
	                        pt.Type as OrderPaymentType,
	                        pt.AccountNumber as OrderAccountNumber,
	                        pt.CreditCardType as OrderCreditCard,
                            p.*,
                            po.*,
                            pat.*,
                            pet.*
                        from CustomerOrder co
                                join SiteUser su
                                    on su.Id = co.UserId
                                join PaymentType pt
                                    on pt.Id = co.PaymentId
                                join PajamaOrder po
                                    on co.Id = po.OrderId
							    join Pajama p
								    on p.Id = po.PajamaId
							    join PajamaType pat
								    on pat.Id = p.PajamaTypeId
							    join PetType pet
								    on pet.Id = p.PetTypeId";

            using var db = new SqlConnection(ConnectionString);

            var carts = new Dictionary<int, CartInfo>();

            var orders = db.Query<CartInfo, Pajama, PajamaOrder, PajamaType, PetType, CartInfo>(sql,
                (cartInfo, pajama, pajamaOrder, pajamaType, petType) =>
                {

                    if (!carts.TryGetValue(cartInfo.OrderId, out var cart))
                    {
                        cart = cartInfo;
                        cart.OrderPajamas = new List<Pajama>();
                        carts.Add(cart.OrderId, cart);
                    }

                    //map the pajama things
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;
                    cart.PajamaQuantity = pajamaOrder.Quantity;

                    //map the order things
                    cart.OrderPajamas.Add(pajama);

                    return cart;
                }, splitOn: "Id")
                .Distinct();
            return orders;
        }

        //Gets a customer order by the Id
        public IEnumerable<CartInfo> Get(string userId)
        {
            var sql = @"SELECT 
	                        co.Id as OrderId,
	                        co.OrderDate as NewOrderDate,
	                        co.ShipDate as NewShipDate,
	                        co.ShipAddress as NewShipAddress,
	                        co.ShipCity as NewShipCity,
	                        co.ShipState as NewShipState,
	                        co.ShipZip as NewShipZip,
	                        co.ShipCountry as NewShipCountry,
	                        co.TotalCost as OrderTotalCost,
                            co.IsCompleted as CompletedOrder,
	                        su.Id as UserId, 
	                        su.FirstName as UserFirstName, 
	                        su.LastName as UserLastName, 
	                        su.EmailAddress as UserEmailAddress, 
	                        pt.Type as OrderPaymentType,
	                        pt.AccountNumber as OrderAccountNumber,
	                        pt.CreditCardType as OrderCreditCard,
                            p.*,
                            po.*,
                            pat.*,
                            pet.* 
                        from CustomerOrder co
                                join SiteUser su
                                    on su.Id = co.UserId
                                join PaymentType pt
                                    on pt.Id = co.PaymentId
                                join PajamaOrder po
                                    on co.Id = po.OrderId
							    join Pajama p
								    on p.Id = po.PajamaId
							    join PajamaType pat
								    on pat.Id = p.PajamaTypeId
							    join PetType pet
								    on pet.Id = p.PetTypeId
                        WHERE su.FirebaseId = @userId AND co.isCompleted = 'false'";

            using var db = new SqlConnection(ConnectionString);

            var carts = new Dictionary<int, CartInfo>();

            var order = db.Query<CartInfo, Pajama, PajamaOrder, PajamaType, PetType, CartInfo>(sql,
                (cartInfo, pajama, pajamaOrder, pajamaType, petType) =>
                {
                    if (!carts.TryGetValue(cartInfo.OrderId, out var cart))
                    {
                        cart = cartInfo;
                        cart.OrderPajamas = new List<Pajama>();
                        carts.Add(cart.OrderId, cart);
                    }

                    //map the pajama things
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;
                    cart.PajamaQuantity = pajamaOrder.Quantity;

                    //map the order things
                    cart.OrderPajamas.Add(pajama);

                    return cart;
                }, new { userId = userId });

            return order;
        }

        public void Add(CustomerOrder customerOrder)
        {
            var sql = @"INSERT INTO [CustomerOrder] ([UserId], [OrderDate],[ShipDate],[ShipAddress], [ShipCity], [ShipState], [ShipZip], [ShipCountry], [PaymentId], [TotalCost], [IsCompleted])
                        OUTPUT inserted.Id
                        VALUES(@UserId, @OrderDate, @ShipDate, @ShipAddress, @ShipCity, @ShipState, @ShipZip, @ShipCountry, @PaymentId, @TotalCost, @IsCompleted)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, customerOrder);

            customerOrder.Id = id;
        }

        public void Update(CustomerOrder customerOrder)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update CustomerOrder
                        Set UserId = @UserId,
                            OrderDate = @OrderDate,
                            ShipDate = @ShipDate,
                            ShipAddress = @ShipAddress,
                            ShipCity = @ShipCity,
                            ShipState = @ShipState,
                            ShipZip = @ShipZip,
                            ShipCountry = @ShipCountry,
                            PaymentId = @PaymentId,
                            TotalCost = @TotalCost,
                            IsCompleted = @IsCompleted
                        Where Id = @id";

            db.Execute(sql, customerOrder);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from CustomerOrder 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
