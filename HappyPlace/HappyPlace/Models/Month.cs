using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Month
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Bill> Bills { get; set; }

        [JsonIgnore]
        public virtual ICollection<DetailExp> DetailExps { get; set; }
    }
}
