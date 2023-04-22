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
        private string server;
        public string Server
        {
            get { return server; }
            set { server = value; }
        }

        private string database;
        public string Database { 
            get { return database; }
            set { database = value; }
        }

        private string user;
        public string User
        {
            get { return user; }
            set { user = value; }
        }

        private string password;
        public string Password { 
            get { return password; }
            set { password = value; }
        }

        public ConnectionFactory(String server, String databse, String user, String password)
        {
            this.server = server;
            this.database = databse;
            this.user = user;
            this.password = password;
        }

        public MySqlConnection CreateConnection()
        {
            String conString = "server=" + this.server + ";database=" + this.database + ";user=" + this.user + ";password=" + this.password+";";
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
