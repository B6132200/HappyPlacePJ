using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Default
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Facilities { get; set; }
        public int RoomRate { get; set; }
        public int WaterRate { get; set; }
        public int ElectricRate { get; set; }
        public int Deposit { get; set; }
        public int RentInAdvance { get; set; }
        public int Lease { get; set; }
        
        public int? Floor { get; set; }
        public int? Status { get; set; }
    }
}
