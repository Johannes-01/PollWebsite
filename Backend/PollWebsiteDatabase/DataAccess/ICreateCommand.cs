using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PollWebsiteDatabase.DataAccess
{
    public interface ICreateCommand
    {
        public IDbConnection con { get; }
        public IDbCommand command { get; set; }
    }
}
