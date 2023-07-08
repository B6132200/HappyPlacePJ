using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public int RoomBill { get; set; }
        public int WaterBill { get; set; }
        public int ElecBill { get; set; }
        public int EmeterStart { get; set; }
        public int EmeterLast { get; set; }
        public int TotalBill { get; set; }
        public string Date { get; set; }
        public string DatePay { get; set; }
        public string Deadline { get; set; }
        public int LateRate { get; set; }
        public int DayLate { get; set; }
        public int LateBill { get; set; }
        public int TotalBillLast { get; set; }
        public string PaidBy { get; set; }


        public int? Month { get; set; }
        public int? Room { get; set; }
        public int? Tenant { get; set; }
        public int? Status { get; set; }

        public virtual Room Rooms { get; set; }
        public virtual Month Months { get; set; }
        public virtual Tenant Tenants { get; set; }
        public virtual Status Statuses { get; set; }










    }
}
