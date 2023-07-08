using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Room> Rooms { get; set; } 
        
        [JsonIgnore]
        public virtual ICollection<Tenant> Tenants { get; set; }

        [JsonIgnore]
        public virtual ICollection<Bill> Bills { get; set; }
    }
}
 
