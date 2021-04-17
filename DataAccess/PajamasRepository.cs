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
    }
}
