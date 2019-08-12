using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalenderApp.Data;
using CalenderApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalenderApp.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserDAO dao;

        public UserController(UserDAO dao)
        {
            this.dao = dao;
        }

        [HttpPost]
        [Route("getuser")]
        public User GetUser([FromBody] User user)
        {
            User check = dao.CheckUserNamePasswordIsCorrect(user);
            if (check == null) return new User(); else return check;
        }

        [HttpPost]
        [Route("newuser")]
        public User MakeNewUser([FromBody] User user)
        {
            User check = dao.GetUser(user.NickName);
            if (check == null) {
                dao.MakeNewUser(user);
                return user;
            }
            else
            {
                return new User();
            }
        }

        /*
        [HttpGet("{name}, {password}")]
        public User GetUser(string name, string password)
        {
            User check = dao.CheckUserNamePasswordIsCorrect(name, password);

            return check;
        }
        */
    }
}