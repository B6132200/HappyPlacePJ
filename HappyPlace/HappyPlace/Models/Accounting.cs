using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Accounting
    {
        public int Id { get; set; }
        public int Income  { get; set; }
        public int Expenses { get; set; }
        public int NetIncome { get; set; }
        public int? Mounth { get; set; }
    }
}
