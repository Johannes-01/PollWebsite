using System;
using MySql.Data.MySqlClient;

namespace PollWebsiteDatabase
{
    class Program
    {
        static void Main(string[] args)
        {
            MySqlConnection con = new MySqlConnection("server=localhost;database=pollwebsite;user=root;password=root");
            try
            {
                con.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error connecting to database: " + ex.Message);
                throw;
            }
            finally
            {
                con.Close();
            }
        }
    }
}