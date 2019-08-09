using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApp.Models
{
    public class User
    {
        public int Id { get; set; } = 0;
        public string NickName { get; set; } = "Anonymous";
        public string ProfileText { get; set; } = "ProfileTextNotSet";
        public string Email { get; set; } = "email@notset.fi";
        public string Password { get; set; } = "password123";
        public string OwnEvents { get; set; } = "";
        public string BookmarkedEvents { get; set; } = "";
        public string FollowedUsers { get; set; } = "";
        public string Categories { get; set; } = "Kaikki tapahtumat";
    }
}
