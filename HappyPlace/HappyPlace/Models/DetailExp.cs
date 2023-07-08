using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class DetailExp
    {
        public int Id { get; set; }
        public string Detail { get; set; }
        public int Amount { get; set; }
        public string Year { get; set; }
        public int? Month { get; set; }

        public virtual Month Months { get; set; }
    }
}
