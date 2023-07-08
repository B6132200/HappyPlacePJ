using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class VMLogin
    {
        public string Email { get; set; }
        public string PassWord { get; set; }
        public bool KeepLoggedIn { get; set; }
    }
}
