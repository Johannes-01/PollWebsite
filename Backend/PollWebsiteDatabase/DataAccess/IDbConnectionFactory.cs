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
        MySqlConnection CreateConnection(String server, String database, String user, String password);
    }
}
