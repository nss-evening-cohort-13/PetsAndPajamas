using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class UsersRepository
    {
        const string ConnectionString = "Server=localhost;Database=LoafAndStranger;Trusted_Connection=True;";

        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        From SiteUser";

            return db.Query<User>(sql).ToList();
        }

        public User Get(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser
                        where id = @id";

            var user = db.QueryFirstOrDefault<User>(sql, new { id });

            return user;
        }

    }
}
