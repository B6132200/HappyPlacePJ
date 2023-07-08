using HappyPlace.Data.UnitOfWork;
using HappyPlace.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Controllers
{
    [Authorize]
    public class BillController : Controller
    {
        private readonly ILogger<BillController> _logger;
        private IUnitOfWork _uow;

        public BillController(ILogger<BillController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetMonthList()
        {
            try
            {
                var data = _uow.MonthRepository.GetAll().OrderBy(o => o.Id);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetRoomList()
        {
            try
            {
                List<Tenant> list = new List<Tenant>();
                var data = _uow.TenantRepository.GetMulti(t => t.Statuses.Name == "ยังอยู่").OrderBy(f => f.Rooms.Floor).ThenBy(i => i.Room).ToList();
                // var Data = _uow.RoomRepository.GetMulti(s => s.Statuses.Name == "ไม่ว่าง").OrderBy(f => f.Floor).ThenBy(i => i.Id).ToList();

                string month = DateTime.Now.ToString("MM");
                string year = DateTime.Now.Year.ToString();
                
               
                int m = Convert.ToInt32(month);

                foreach (var item in data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);
                    item.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Rooms.Floor);
                    item.Rooms.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Rooms.Status);

                    if (item.DateCI.Substring(3, 2) != month)
                    {
                        var billpast = _uow.BillRepository.GetSingleByCondition(b => b.Room == item.Room && b.Month == m - 1 && b.Date.Substring(6, 4) == year);
                        item.EmeterStart = billpast.EmeterLast;
                    }

                    list.Add(item);
                    
                }


                return Ok(list);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetBillList(int mid, string year)
        {
            try
            {
               
                List<Bill> list = new List<Bill>();
                var data = _uow.BillRepository.GetMulti(b => b.Month == mid && b.Date.Substring(6, 4) == year)
                    .OrderBy(f => f.Rooms.Floor).ThenBy(i => i.Room).ToList();
 
                foreach (var item in data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);
                    item.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Rooms.Floor);
                    item.Rooms.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Rooms.Status);
                    item.Months = _uow.MonthRepository.GetSingleByCondition(m => m.Id == item.Month);
                    item.Tenants = _uow.TenantRepository.GetSingleByCondition(m => m.Id == item.Tenant);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);
                    list.Add(item);

                }
             //   var Data = list.OrderBy(f => f.Rooms.Floor).ThenBy(i => i.Rooms.Id);

                return Ok(list);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }


        [HttpPost]
        public JsonResult SaveBill([FromBody] List<Bill> data)

        {
            string month = DateTime.Now.ToString("MM");
            int m = Convert.ToInt32(month) + 1;
            if(m < 10)
            {
                
                month = "0" + m.ToString();
            }
            else
            {
                month = m.ToString();
            }

            string year = DateTime.Now.Year.ToString();

            var length = data.Count();
            try
            {
                for(var i = 0; i < length; i++)
                {
                    var countdata = _uow.BillRepository.GetAll().Count();
                    if (countdata == 0)
                    {
                        data[i].Id = 1;
                        data[i].DatePay = "-";
                        data[i].Deadline = "05/" + month + "/" + year;
                        data[i].LateRate = 50;
                        data[i].DayLate = 0;
                        data[i].LateBill = 0;
                        data[i].TotalBillLast = data[i].TotalBill;
                        data[i].PaidBy = "-";


                    }
                    else
                    {
                        var maxId = _uow.BillRepository.GetAll().Max(r => r.Id);
                        data[i].Id = maxId + 1;

                        var dataB = _uow.BillRepository.GetSingleByCondition(b => b.Id == maxId);
                        
                        var dayDeadline = dataB.Deadline.Substring(0, 2);

                        data[i].DatePay = "-";
                        data[i].Deadline = dayDeadline + "/" + month + "/" + year;
                        data[i].LateRate = dataB.LateRate;
                        data[i].DayLate = 0;
                        data[i].LateBill = 0;
                        data[i].TotalBillLast = data[i].TotalBill;
                        data[i].PaidBy = "-";

                    }

                    var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ค้างชำระ");
                    data[i].Status = status.Id;

                    _uow.BillRepository.Insert(data[i]);
                    _uow.Commit();

                    
                    var dataD = _uow.TenantRepository.GetSingleByCondition(t => t.Id == data[i].Tenant &&
                    t.DateOut.Substring(3, 2) == data[i].Date.Substring(3, 2) && t.DateOut.Substring(6, 4) == data[i].Date.Substring(6, 4));

                    if(dataD != null)
                    {
                        var dataDD = _uow.DetailCORepository.GetAll().Count();
                        var Did = 0;
                        if (dataDD == 0)
                        {
                            Did = Did + 1;
                        }
                        else
                        {
                            var maxid = _uow.DetailCORepository.GetAll().Max(d => d.Id);
                            Did = maxid + 1;

                        }
                        List<DetailCO> dataB = new List<DetailCO>
                        {
                             new DetailCO{Id = Did, Detail = "ค่าน้ำ", Amount = data[i].WaterBill, Tenant = data[i].Tenant},
                             new DetailCO{Id = Did + 1, Detail = "ค่าไฟ", Amount = data[i].ElecBill, Tenant = data[i].Tenant},
                        };

                        var lengthdataB = dataB.Count();
                        for (var j = 0; j < lengthdataB; j++)
                        {
                            _uow.DetailCORepository.Insert(dataB[j]);
                            _uow.Commit();
                        }

                        var dataT = _uow.TenantRepository.GetSingleByCondition(t => t.Id == data[i].Tenant);

                        var calFine = 0;

                        dataT.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == dataT.Room);
                        var dataDTT = _uow.DetailCORepository.GetMulti(d => d.Tenant == dataT.Id);
                        if (dataDTT != null)
                        {
                            foreach (var item in dataDTT)
                            {
                                calFine = calFine + item.Amount;
                            }

                            dataT.Fine = calFine;
                            dataT.Refund = dataT.Rooms.Deposit - calFine;
                        }
                        else
                        {
                            dataT.Fine = 0;
                            dataT.Refund = dataT.Rooms.Deposit - calFine;
                        }

                       

                        _uow.TenantRepository.Update(dataT);
                        _uow.Commit();

                    }

                }
                return Json(true);

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        } 
        
        [HttpPost]
        public JsonResult EditBill([FromBody] Bill obj)

        {
            
            try
            {
                var data = _uow.BillRepository.GetSingleByCondition(b => b.Id == obj.Id);
                if(data != null)
                {
                    data.EmeterLast = obj.EmeterLast;
                    data.ElecBill = obj.ElecBill;
                    data.TotalBill = obj.TotalBill;

                    _uow.BillRepository.Update(data);
                    _uow.Commit();

                   var dataT = _uow.TenantRepository.GetSingleByCondition(t => t.Id == data.Tenant &&
                   t.DateOut.Substring(3, 2) == data.Date.Substring(3, 2) && t.DateOut.Substring(6, 4) == data.Date.Substring(6, 4));

                    if(dataT != null)
                    {
                        var dataDT = _uow.DetailCORepository.GetSingleByCondition(d => d.Tenant == data.Tenant && d.Detail == "ค่าไฟ");

                        if(dataDT != null)
                        {
                            dataDT.Amount = data.ElecBill;

                            _uow.DetailCORepository.Update(dataDT);
                            _uow.Commit();

                            var calFine = 0;

                            dataT.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == dataT.Room);
                            var dataDTT = _uow.DetailCORepository.GetMulti(d => d.Tenant == dataT.Id);
                            if (dataDTT != null)
                            {
                                foreach (var item in dataDTT)
                                {
                                    calFine = calFine + item.Amount;
                                }

                                dataT.Fine = calFine;
                                dataT.Refund = dataT.Rooms.Deposit - calFine;
                            }
                            else
                            {
                                dataT.Fine = 0;
                                dataT.Refund = dataT.Rooms.Deposit - calFine;
                            }


                            _uow.TenantRepository.Update(dataT);
                            _uow.Commit();

                        }


                    }

                }

                return Json(true);

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }


    }
}
