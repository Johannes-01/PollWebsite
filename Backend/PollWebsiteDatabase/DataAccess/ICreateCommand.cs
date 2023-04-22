using MySql.Data.MySqlClient;
using System.Data;

namespace PollWebsiteDatabase.DataAccess
{
    public interface ICreateCommand
    {
        public MySqlConnection Connection { get; set; }
        public IDbCommand Command { get; set; }
    }
}
