using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;

namespace PollWebsiteDatabase.DataAccess
{
    public class ConnectionFactory : IDbConnectionFactory
    {
        private readonly string _connectionString;

        public ConnectionFactory(String server, String databse, String user, String password)
        {
            
        }

        public MySqlConnection CreateConnection(String server, String database, String user, String password)
        {
            /*server = localhost
             database = pollwebsite
            user = root
            password = root*/
            String conString = "server=" + server + ";database=" + database + ";user=" + user + ";password=" + password;
            MySqlConnection conFactory = new MySqlConnection(conString);
            
            try
            {
                conFactory.Open();
                Console.WriteLine(conFactory.Database);
                return conFactory;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error connecting to database: " + ex.Message);
                throw;
            }
            finally
            {
                conFactory.Close();
            }
        }
    }
}
