using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Room
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


        public virtual Floor Floors { get; set; }
        public virtual Status Statuses { get; set; }

        [JsonIgnore]
        public virtual ICollection<Tenant> Tenants { get; set; }  
        
        [JsonIgnore]
        public virtual ICollection<Book> Books { get; set; }

        [JsonIgnore]
        public virtual ICollection<Bill> Bills { get; set; }


    }
}
