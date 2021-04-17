using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class SiteUsersRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";

        public List<SiteUser> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser u
                        join ShoppingCart c on u.CartId = c.Id";

            return db.Query<SiteUser, ShoppingCart, SiteUser>(
                sql,
                (siteUser, shoppingCart) =>
                {
                    siteUser.ShoppingCart = shoppingCart;
                    return siteUser;
                },
                splitOn:"Id")
                .ToList();
        }

        public SiteUser Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser u
                        join ShoppingCart c on u.CartId = c.Id
                        where u.id = @id";

            var user = db.QueryFirstOrDefault<SiteUser>(sql, new { id });

            return user;
        }

    }
}
