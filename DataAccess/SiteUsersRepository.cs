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

        public IEnumerable<SiteUser> Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser u
                            join ShoppingCart c on u.CartId = c.Id
                        where u.id = @id";

            var user = db.Query<SiteUser, ShoppingCart, SiteUser>(
                sql,
                (siteUser, shoppingCart) =>
                {
                    siteUser.ShoppingCart = shoppingCart;
                    return siteUser;
                },
                new { id });

            return user;
        }

        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update SiteUser
                        set IsActive = 0
                        where id = @id";

            db.Execute(sql, new { id });
        }

        public void Add(SiteUser siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[SiteUser] ([FirstName],[LastName],[EmailAddress],[Address],[City],[State],[ZipCode],[Country],[Phone],[CartId],[Admin],[IsActive])
                        OUTPUT inserted.id
                        VALUES('John','Smith','jsmith@gmail.com','877 Jump St','Denver','CO',80203,'United States',6158889999,3,0,0)";

            var id = db.ExecuteScalar<int>(sql, siteUser);

            siteUser.Id = id;
        }

    }
}
