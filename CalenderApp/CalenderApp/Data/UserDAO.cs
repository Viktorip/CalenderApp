using CalenderApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApp.Data
{
    public class UserDAO
    {
        private CalenderContext ctx;

        public UserDAO(CalenderContext ctx)
        {
            this.ctx = ctx;
        }

        public User GetUser(int id)
        {
            return ctx.Users.Find(id);
        }
    }
}
