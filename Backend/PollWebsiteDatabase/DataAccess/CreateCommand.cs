using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PollWebsiteDatabase.DataAccess
{
    public class CreateCommand : ICreateCommand
    {

        private MySqlConnection connection;
        public MySqlConnection Connection
        {
            get { return connection; }
            set { connection = getCon(); }
        }


        private IDbCommand command;
        public IDbCommand Command
        {
            get { return command; }
            set { command = value; }
        }

        public CreateCommand()
        {
            Connection = Connection;
            sqlStatement();
        }


        public void sqlStatement()
        {
            IDbConnection connection = Connection;
            IDbCommand command = connection.CreateCommand();
            command.CommandText = "CREATE TABLE poll_entry (pollID INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT, polltype INTEGER, author INTEGER, startdate DATE, enddate DATE);";

            // Execute the query and process the results
            using (IDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    // Process each row of data
                    Console.WriteLine(reader.GetString(0));
                }
            }

        }
        public MySqlConnection getCon()
        {
            var conFactory = new ConnectionFactory("localhost", "pollwebsite", "root", "root");
            var connection = conFactory.CreateConnection();
            return connection;
        }
    }
}
