using Dapper;
using Microsoft.Data.SqlClient;
using PetsAndPajamas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsAndPajamas.DataAccess
{
    public class SiteUsersRepository
    {
        const string ConnectionString = "Server=localhost;Database=PetsAndPajamas;Trusted_Connection=True;";

        public List<SiteUser> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser";

            return db.Query<SiteUser>(sql).ToList();
        }

        public IEnumerable<SiteUser> Get(string id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from SiteUser
                        where firebaseid = @id";

            var user = db.Query<SiteUser>(sql, new { id });

            return user;
        }

        public void Disable(string id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [dbo].[SiteUser]
                        SET [FirstName] = 'DeletedUser',
                            [LastName] = 'DeletedUser',
                            [EmailAddress] = 'DeletedUser',
                            [Address] = 'DeletedUser',
                            [City] = 'DeletedUser',
                            [State] = 'DU',
                            [ZipCode] = 00000,
                            [Country] = 'DeletedUser',
                            [Phone] = 'DeleteUser',
                            [IsActive] = 0,
                        WHERE firebaseid = @id";

            db.Execute(sql, new { id });
        }

        public void Add(SiteUser siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[SiteUser] ([FirebaseId], [FirstName],[LastName],[EmailAddress],[Address],[City],[State],[ZipCode],[Country],[Phone],[Admin],[IsActive])
                            OUTPUT inserted.id
                            VALUES(@FirebaseId,@FirstName,@LastName,@EmailAddress,@Address,@City,@State,@ZipCode,@Country,@Phone,@Admin,@IsActive)";

            var id = db.ExecuteScalar<int>(sql, siteUser);

            siteUser.Id = id;
        }

        public void Update(SiteUser siteUser)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE SiteUser
                        SET FirstName = @FirstName,
                            LastName = @LastName,
                            EmailAddress = @EmailAddress,
                            Address = @Address,
                            City = @City,
                            State = @State,
                            ZipCode = @ZipCode,
                            Country = @Country,
                            Phone = @Phone,
                            Admin = @Admin,
                            IsActive = @IsActive
                        WHERE id = @id";

            db.Execute(sql, siteUser);
        }

    }
}
