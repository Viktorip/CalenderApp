using CalenderApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            string hash = MakeHash(user.Password);
            User check = users.Find(x => x.NickName == user.NickName && x.Password == hash);

            return check;
        }

        public User MakeNewUser(User user)
        {
            User nus = user;
            string hash = MakeHash(nus.Password);
            nus.Password = hash;
            ctx.Users.Add(nus);
            ctx.SaveChanges();
            return user;
        }

        private string MakeHash(string input)
        {
            byte[] data = System.Security.Cryptography.MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}
