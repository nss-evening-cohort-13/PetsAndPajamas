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

            var orders = db.Query<CustomerOrder, User, PaymentType, CustomerOrder>(sql,
                (customerOrder, user, paymentType) =>
                {
                    customerOrder.User = user;
                    customerOrder.PaymentType = paymentType;

                    return customerOrder;
                }, splitOn: "Id");
            return orders;
        }
    }
}
