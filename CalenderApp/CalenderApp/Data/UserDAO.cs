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
            return ctx.Users.ToList().Find(x => x.Id == id);
        }

        public User GetUser(string nickName)
        {
            return ctx.Users.ToList().Find(x => x.NickName.ToLower() == nickName.ToLower());
        }

        public User CheckUserNamePasswordIsCorrect(User user)
        {
            List<User> users = ctx.Users.ToList();
            User check = users.Find(x => x.NickName == user.NickName && x.Password == user.Password);

            return check;
        }

        public User MakeNewUser(User user)
        {
            ctx.Users.Add(user);
            ctx.SaveChanges();
            return user;
        }
    }
}
