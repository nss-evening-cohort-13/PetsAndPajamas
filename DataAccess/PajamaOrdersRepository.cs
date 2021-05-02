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
                            join CustomerOrder co
                                on co.Id = po.OrderId
                            join SiteUser su
                                on su.Id = co.UserId
                            join Pajama p
                                on p.Id = po.PajamaId
                            join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            join PetType pet
                                on pet.Id = p.PetTypeId";

            using var db = new SqlConnection(ConnectionString);

            var pajamaOrders = db.Query<PajamaOrder, CustomerOrder, SiteUser, Pajama, PajamaType, PetType, PajamaOrder>(sql,
                (pajamaOrder, customerOrder, siteUser, pajama, pajamaType, petType) =>
                {
                    pajamaOrder.CustomerOrder = customerOrder;
                    pajamaOrder.Pajama = pajama;
                    customerOrder.SiteUser = siteUser;
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajamaOrder;
                }, splitOn: "Id");
            return pajamaOrders;
        }

        public IEnumerable<PajamaOrder> Get(int id)
        {
            var sql = @"select * from PajamaOrder po
                            join CustomerOrder co
                                on co.Id = po.OrderId
                            join SiteUser su
                                on su.Id = co.UserId
                            join Pajama p
                                on p.Id = po.PajamaId
                            join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            join PetType pet
                                on pet.Id = p.PetTypeId
                        where po.Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var pajama = db.Query<PajamaOrder, CustomerOrder, SiteUser, Pajama, PajamaType, PetType, PajamaOrder>(sql,
                (pajamaOrder, customerOrder, siteUser, pajama, pajamaType, petType) =>
                {
                    pajamaOrder.CustomerOrder = customerOrder;
                    pajamaOrder.Pajama = pajama;
                    customerOrder.SiteUser = siteUser;
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajamaOrder;
                }, new { id });
            return pajama;
        }

        public IEnumerable<PajamaOrder> GetByPajamaId(int pajamaId, int orderId)
        {
            var sql = @"select * from PajamaOrder po
                            join CustomerOrder co
                                on co.Id = po.OrderId
                            join SiteUser su
                                on su.Id = co.UserId
                            join Pajama p
                                on p.Id = po.PajamaId
                            join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            join PetType pet
                                on pet.Id = p.PetTypeId
                        where p.Id = @pajamaId AND co.Id = @orderId";

            using var db = new SqlConnection(ConnectionString);

            var pajama = db.Query<PajamaOrder, CustomerOrder, SiteUser, Pajama, PajamaType, PetType, PajamaOrder>(sql,
                (pajamaOrder, customerOrder, siteUser, pajama, pajamaType, petType) =>
                {
                    pajamaOrder.CustomerOrder = customerOrder;
                    pajamaOrder.Pajama = pajama;
                    customerOrder.SiteUser = siteUser;
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajamaOrder;
                }, new { pajamaId, orderId });
            return pajama;
        }

        public void Add(PajamaOrder pajamaOrder)
        {
            var sql = @"INSERT INTO [PajamaOrder] ([OrderId],[PajamaId],[Quantity])
                        OUTPUT inserted.id
                        VALUES(@orderId, @pajamaId, @quantity)";

            using var db = new SqlConnection(ConnectionString);


            var id = db.ExecuteScalar<int>(sql, pajamaOrder);

            pajamaOrder.Id = id;
        }

        public void Update(PajamaOrder pajamaOrder)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [PajamaOrder]
                        SET [OrderId] = @OrderId,
                            [PajamaId] = @PajamaId,
                            [Quantity] = @Quantity
                        WHERE id = @id";

            db.Execute(sql, pajamaOrder);
        }

        public void Remove(int id)
        {
            var sql = @"Delete 
                        from PajamaOrder 
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }
    }
}
