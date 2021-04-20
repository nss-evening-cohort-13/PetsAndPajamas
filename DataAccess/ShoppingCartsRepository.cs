using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class ShoppingCartsRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";

        public List<ShoppingCart> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from ShoppingCart";

            return db.Query<ShoppingCart>(sql).ToList();
        }

        public IEnumerable<ShoppingCart> Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from ShoppingCart c
                        where c.id = @id";

            var cart = db.Query<ShoppingCart>(sql, new { id });

            return cart;
        }

        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [dbo].[ShoppingCart]
                        SET [IsActive] = 0
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        public void Add(ShoppingCart shoppingCart)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[ShoppingCart]([TotalCost],[IsActive])
                        OUTPUT inserted.id
                        VALUES(@TotalCost,@IsActive)";

            var id = db.ExecuteScalar<int>(sql, shoppingCart);

            shoppingCart.Id = id;
        }

        public void Update(ShoppingCart shoppingCart)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [dbo].[ShoppingCart]
                        SET [TotalCost] = @TotalCost,
                            [IsActive] = @IsActive
                        WHERE id = @id";

            db.Execute(sql, shoppingCart);
        }
    }
}
