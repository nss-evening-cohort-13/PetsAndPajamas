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
    public class PajamasRepository
    {
        readonly string ConnectionString;

        public PajamasRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PetsAndPajamas");
        }

        public IEnumerable<Pajama> GetAll()
        {
            var sql = @"select * from Pajama p
                            left join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            left join PetType pet
                                on pet.Id = p.PetTypeId";

            using var db = new SqlConnection(ConnectionString);

            var pajamas = db.Query<Pajama, PajamaType, PetType, Pajama>(sql,
                (pajama, pajamaType, petType) =>
                {
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajama;
                }, splitOn: "Id");
            return pajamas;
        }

        public IEnumerable<Pajama> Get(int id)
        {
            var sql = @"select * from Pajama p
                            left join PajamaType pat
                                on pat.Id = p.PajamaTypeId
                            left join PetType pet
                                on pet.Id = p.PetTypeId
                        where p.Id = @id";

            using var db = new SqlConnection(ConnectionString);

            var pajama = db.Query<Pajama, PajamaType, PetType, Pajama>(sql,
                (pajama, pajamaType, petType) =>
                {
                    pajama.PajamaType = pajamaType;
                    pajama.PetType = petType;

                    return pajama;
                }, new { id });
            return pajama;
        }
        
        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update Pajama
                        set IsActive = 0
                        where Id = @id";

            db.Execute(sql, new { id });
        }

        public Pajama Add(PajamaAdd pajama)
        {
            var sql = @"INSERT INTO [Pajama] ([Size],[Color],[Pattern], [Price], [Description], [Inventory], [Title], [DateCreated], [IsActive], [PajamaTypeId], [PetTypeId])
                        OUTPUT inserted.*
                        VALUES(@Size, @Color, @Pattern, @Price, @Description, @Inventory, @Title, @DateCreated, @IsActive, @PajamaTypeId, @PetTypeId)";

            using var db = new SqlConnection(ConnectionString);


            var newPajama = db.QuerySingle<Pajama>(sql, new { pajama.Size, pajama.Color, pajama.Pattern, pajama.Price, pajama.Description, pajama.Inventory, pajama.Title, pajama.DateCreated, pajama.IsActive, pajama.PajamaTypeId, pajama.PetTypeId });

            return newPajama;
        }

        public void Update(PajamaAdd pajama)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update Pajama
                        Set Size = @Size,
                            Color = @Color,
                            Pattern = @Pattern,
                            Price = @Price,
                            Description = @Description,
                            Inventory = @Inventory,
                            Title = @Title,
                            DateCreated = @DateCreated,
                            IsActive = @IsActive,
                            PajamaTypeId = @PajamaTypeId,
                            PetTypeId = @PetTypeId
                        Where Id = @id";

            db.Execute(sql, pajama);
        }
    }
}
