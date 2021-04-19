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

            var sql = @"UPDATE [dbo].[SiteUser]
                        SET [FirstName] = 'DeletedUser',
                            [LastName] = 'DeletedUser',
                            [EmailAddress] = 'DeletedUser',
                            [Address] = 'DeletedUser',
                            [City] = 'DeletedUser',
                            [State] = 'DU',
                            [ZipCode] = 00000,
                            [Country] = 'DeletedUser',
                            [Phone] = 'DeleteUser',
                            [IsActive] = 0
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        public void Add(SiteUser siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[SiteUser] ([FirstName],[LastName],[EmailAddress],[Address],[City],[State],[ZipCode],[Country],[Phone],[CartId],[Admin],[IsActive])
                        OUTPUT inserted.id
                        VALUES(@FirstName,@LastName,@EmailAddress,@Address,@City,@State,@ZipCode,@Country,@Phone,@cartId,@Admin,@IsActive)";

            var id = db.ExecuteScalar<int>(sql, siteUser);

            siteUser.Id = id;
        }

        public void Update(SiteUser siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [dbo].[SiteUser]
                        SET [FirstName] = @FirstName,
                            [LastName] = @LastName,
                            [EmailAddress] = @EmailAddress,
                            [Address] = @Address,
                            [City] = @City,
                            [State] = @State,
                            [ZipCode] = @ZipCode,
                            [Country] = @Country,
                            [Phone] = @Phone,
                            [CartId] = @CartId,
                            [Admin] = @Admin,
                            [IsActive] = @IsActive
                        WHERE id = @id";

            db.Execute(sql, siteUser);
        }

    }
}
