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
        public IDbConnection con => IDbConnectionFactory.CreateConnection("localhost","pollwebsite","root","root");

        public IDbCommand command { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
