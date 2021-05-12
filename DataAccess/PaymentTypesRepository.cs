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

        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"update PaymentType
                        set IsActive = 0
                        where id = @id";

            db.Execute(sql, new { id });
        }

        public void Add(PaymentType paymentType)
        {
            var sql = @"INSERT INTO [PaymentType] ([Type],[AccountNumber],[Cvv],[ExpirationMonth],[ExpirationYear],[CreditCardType],[isActive])
                       OUTPUT inserted.Id
                       VALUES(@Type, @AccountNumber, @Cvv, @ExpirationMonth, @ExpirationYear, @CreditCardType, @isActive)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, paymentType);

            paymentType.Id = id;
        }

        public void Update(PaymentType paymentType)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE PaymentType
                        SET Type = @Type,
                            AccountNumber = @AccountNumber,
                            Cvv = @Cvv,
                            ExpirationMonth = @ExpirationMonth,
                            ExpirationYear = @ExpirationYear,
                            CreditCardType = @CreditCardType,
                            isActive = @isActive
                        Where Id = @id";

            db.Execute(sql, paymentType);
        }

        public void Remove(int id)
        {
            var sql = @"Delete
                        from PaymentType
                        where Id = @id";

            using var db = new SqlConnection(ConnectionString);

            db.Execute(sql, new { id });
        }


    }
}
