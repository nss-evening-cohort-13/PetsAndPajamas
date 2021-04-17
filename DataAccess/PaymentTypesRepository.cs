using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsAndPajamas.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace PetsAndPajamas.DataAccess
{
    public class PaymentTypesRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";

        public List<PaymentType> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from PaymentType";

            return db.Query<PaymentType>(sql).ToList();
        }

        public PaymentType Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from PaymentType
                        where id = @id";

            var type = db.QueryFirstOrDefault<PaymentType>(sql, new { id });

            return type;
        }


    }
}
