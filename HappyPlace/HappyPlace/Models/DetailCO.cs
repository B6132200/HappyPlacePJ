using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class DetailCO
    {
        public int Id { get; set; }
        public string Detail { get; set; }
        public int Amount { get; set; }
        public int? Tenant { get; set; }

        public virtual Tenant Tenants { get; set; }
    }
}
