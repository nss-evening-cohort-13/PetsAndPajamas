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
    public class PajamaOrdersRepository
    {
        readonly string ConnectionString;

        public PajamaOrdersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PetsAndPajamas");
        }

        public IEnumerable<PajamaOrder> GetAll()
        {
            var sql = @"select * from PajamaOrder po
                            join ShoppingCart sc
                                on sc.Id = po.CartId
                            join Pajama p
                                on p.Id = po.PajamaId
                            join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            join PetType pet
                                on pet.Id = p.PetTypeId";

            using var db = new SqlConnection(ConnectionString);

            var pajamaOrders = db.Query<PajamaOrder, ShoppingCart, Pajama, PajamaType, PetType, PajamaOrder>(sql,
                (pajamaOrder, shoppingCart, pajama, pajamaType, petType) =>
                {
                    pajamaOrder.ShoppingCart = shoppingCart;
                    pajamaOrder.Pajama = pajama;
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajamaOrder;
                }, splitOn: "Id");
            return pajamaOrders;
        }

        public IEnumerable<PajamaOrder> Get(int id)
        {
            var sql = @"select * from PajamaOrder po
                            join ShoppingCart sc
                                on sc.Id = po.CartId
                            join Pajama p
                                on p.Id = po.PajamaId
                            join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            join PetType pet
                                on pet.Id = p.PetTypeId
                        where po.Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var pajama = db.Query<PajamaOrder, ShoppingCart, Pajama, PajamaType, PetType, PajamaOrder>(sql,
                (pajamaOrder, shoppingCart, pajama, pajamaType, petType) =>
                {
                    pajamaOrder.ShoppingCart = shoppingCart;
                    pajamaOrder.Pajama = pajama;
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajamaOrder;
                }, new { id });
            return pajama;
        }

        public void Add(PajamaOrder pajamaOrder)
        {
            var sql = @"INSERT INTO [PajamaOrder] ([CartId],[PajamaId],[Quantity])
                        OUTPUT inserted.id
                        VALUES(@cartId, @pajamaId, @quantity)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, pajamaOrder);

            pajamaOrder.Id = id;
        }

        public void Update(PajamaOrder pajamaOrder)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [PajamaOrder]
                        SET [CartId] = @CartId,
                            [PajamaId] = @PajamaId,
                            [Quantity] = @Quantity
                        WHERE id = @id";

            db.Execute(sql, pajamaOrder);
        }
    }
}
