using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace PetsAndPajamas.DataAccess
{
    public class CustomerOrdersRepository
    {
        readonly string ConnectionString;

        public CustomerOrdersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PetsAndPajamas");
        }
    }
}
