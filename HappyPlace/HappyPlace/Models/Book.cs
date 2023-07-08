using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public int Deposit { get; set; }
        public int EntranceFee { get; set; }
        public string DateCI { get; set; }
        public string DateB { get; set; }
        public int? Room { get; set; }

        public virtual Room Rooms { get; set; }
    }
}
