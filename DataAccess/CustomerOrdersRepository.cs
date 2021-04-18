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
	                        su.Id as UserId, 
	                        su.FirstName as UserFirstName, 
	                        su.LastName as UserLastName, 
	                        su.EmailAddress as UserEmailAddress, 
	                        sc.TotalCost as OrderTotalCost,
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
                                join ShoppingCart sc
                                    on sc.Id = su.CartId
                                join PajamaOrder po
                                    on sc.Id = po.CartId
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
        public IEnumerable<CartInfo> Get(int id)
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
	                        su.Id as UserId, 
	                        su.FirstName as UserFirstName, 
	                        su.LastName as UserLastName, 
	                        su.EmailAddress as UserEmailAddress, 
	                        sc.TotalCost as OrderTotalCost,
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
                                join ShoppingCart sc
                                    on sc.Id = su.CartId
                                join PajamaOrder po
                                    on sc.Id = po.CartId
							    join Pajama p
								    on p.Id = po.PajamaId
							    join PajamaType pat
								    on pat.Id = p.PajamaTypeId
							    join PetType pet
								    on pet.Id = p.PetTypeId
                        WHERE co.Id = @id";

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
                }, new { id });

            return order;
        }
    }
}
