using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PollWebsiteDatabase.DataAccess
{
    public interface IDbConnectionFactory
    {
        public String Server { get; set; }
        public String Database { get; set; }
        public String User { get; set; }
        public String Password { get; set; }
        public MySqlConnection CreateConnection();
    }
}
