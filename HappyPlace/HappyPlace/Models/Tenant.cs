using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Tenant
    {
        public int Id { get; set; }
        public string Tn { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Total { get; set; }
        public int EmeterStart { get; set; }
        public int WaterBill { get; set; }
        public string DateCI { get; set; }
        public string DateOut { get; set; }
        public int Fine { get; set; }
        public int Refund { get; set; }
        public int? Room { get; set; }
        public int? Status { get; set; }

        public virtual Room Rooms { get; set; }
        public virtual Status Statuses { get; set; }

        [JsonIgnore]
        public virtual ICollection<Bill> Bills { get; set; }

        [JsonIgnore]
        public virtual ICollection<DetailCO> DetailCOs { get; set; }

    }
}
