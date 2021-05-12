using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class PetTypesRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";
        public List<PetType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        from PetType";

            return db.Query<PetType>(sql).ToList();
        }

        public PetType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        from PetType
                        where id = @id";

            return db.QueryFirstOrDefault<PetType>(sql, new { id });
        }

        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update PetType
                        set IsActive = 0
                        where id = @id";

            db.Execute(sql, new { id });
        }

        public void Add(PetType petType)
        {
            var sql = @"INSERT INTO [PetType] ([Type],[isActive])
                       OUTPUT inserted.Id
                       VALUES(@Type, @isActive)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, petType);

            petType.Id = id;
        }

        public void Update(PetType petType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE PetType
                        SET Type = @Type,
                            isActive = @isActive
                        Where Id = @id";

            db.Execute(sql, petType);
        }

    }
}
