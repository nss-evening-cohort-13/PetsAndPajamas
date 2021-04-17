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
        public IEnumerable<CustomerOrder> GetAll()
        {
            var sql = @"select * from CustomerOrder co
                            left join SiteUser su
                                on su.Id = co.UserId
                            left join PaymentType pt
                                on pt.Id = co.PaymentId
                            join ShoppingCart sc
                                on sc.Id = su.CartId";

            using var db = new SqlConnection(ConnectionString);

            var orders = db.Query<CustomerOrder, SiteUser, PaymentType, ShoppingCart, CustomerOrder>(sql,
                (customerOrder, siteUser, paymentType, shoppingCart) =>
                {
                    customerOrder.SiteUser = siteUser;
                    customerOrder.PaymentType = paymentType;
                    siteUser.ShoppingCart = shoppingCart;

                    return customerOrder;
                }, splitOn: "Id");
            return orders;
        }

        //Gets a customer order by the Id
        public IEnumerable<CustomerOrder> Get(int id)
        {
            var sql = @"SELECT * 
                        FROM CustomerOrder co
                            left join SiteUser su
                                on su.Id = co.UserId
                            left join PaymentType pt
                                on pt.Id = co.PaymentId
                            join ShoppingCart sc
                                on sc.Id = su.CartId
                        WHERE co.Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var order = db.Query<CustomerOrder, SiteUser, PaymentType, ShoppingCart, CustomerOrder>(sql,
                (customerOrder, siteUser, paymentType, shoppingCart) =>
                {
                    customerOrder.SiteUser = siteUser;
                    customerOrder.PaymentType = paymentType;
                    siteUser.ShoppingCart = shoppingCart;

                    return customerOrder;
                }, new { id });

            return order;
        }
    }
}
