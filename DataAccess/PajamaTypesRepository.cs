using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class PajamaTypesRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";

        public List<PajamaType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from PajamaType";

            return db.Query<PajamaType>(sql).ToList();
        }

        public PajamaType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from PajamaType
                        where id = @id";

            var type = db.QueryFirstOrDefault<PajamaType>(sql, new { id });

            return type;
        }

        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update PajamaType
                        set IsActive = 0
                        where id = @id";

            db.Execute(sql, new { id });
        }
    }
}
