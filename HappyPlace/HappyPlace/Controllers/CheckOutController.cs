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
    public class CheckOutController : Controller
    {
        private readonly ILogger<CheckOutController> _logger;
        private IUnitOfWork _uow;

        public CheckOutController(ILogger<CheckOutController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Record()
        {
            return View();
        }


        [HttpGet]
        public IActionResult GetRoomList(int idFloor)
        {
            try
            {
                List<Tenant> list = new List<Tenant>();
                var data = _uow.TenantRepository.GetMulti(t => t.Statuses.Name == "ยังอยู่" && t.Rooms.Floor == idFloor && t.Rooms.Statuses.Name == "ไม่ว่าง").OrderBy(f => f.Room).ToList();

                foreach (var item in data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);
                    item.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Rooms.Floor);
                    item.Rooms.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Rooms.Status);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);
                    list.Add(item);

                }


                return Ok(list);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveCO([FromBody] Tenant obj)
        {

            try
            {
                var data = _uow.TenantRepository.GetSingleByCondition(t => t.Id == obj.Id && t.Room == obj.Room);

                if (data != null)
                {

                    data.DateOut = obj.DateOut;
                    data.Fine = 0;
                    data.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == data.Room);
                    data.Refund = data.Rooms.Deposit;

                    _uow.TenantRepository.Update(data);
                    _uow.Commit();
                }

                return Json(true);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetCheckOutList()
        {
            try
            {
                List<Tenant> list = new List<Tenant>();
                var data = _uow.TenantRepository.GetMulti(t => t.Statuses.Name == "ยังอยู่" && t.DateOut != "-")
                    .OrderBy(t => t.DateOut.Substring(6, 4)).ThenBy(t => t.DateOut.Substring(3, 2)).ThenBy(t => t.DateOut.Substring(0, 2)).ToList();

                foreach (var item in data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);
                    item.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Rooms.Floor);
                    item.Rooms.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Rooms.Status);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);

                    list.Add(item);

                }

                return Ok(list);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult EditDateOut(int Id, string DateOut)
        {

            try
            {
                var data = _uow.TenantRepository.GetSingleByCondition(t => t.Id == Id);

                if (data != null)
                {
                    data.DateOut = DateOut;

                    var bill = _uow.BillRepository.GetSingleByCondition(b => b.Tenant == data.Id && b.Date.Substring(3, 2) == data.DateOut.Substring(3, 2) && b.Date.Substring(6, 4) == data.DateOut.Substring(6, 4));

                    if (bill != null)
                    {
                        var dataDE = _uow.DetailCORepository.GetSingleByCondition(d => d.Detail == "ค่าไฟ" && d.Tenant == data.Id);
                        var dataDT = _uow.DetailCORepository.GetSingleByCondition(d => d.Detail == "ค่าน้ำ" && d.Tenant == data.Id);

                        if (dataDT == null || dataDE == null)
                        {
                            var dataD = _uow.DetailCORepository.GetAll().Count();
                            var Did = 0;
                            if (dataD == 0)
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
                             new DetailCO{Id = Did, Detail = "ค่าน้ำ", Amount = bill.WaterBill, Tenant = bill.Tenant},
                             new DetailCO{Id = Did + 1, Detail = "ค่าไฟ", Amount = bill.ElecBill, Tenant = bill.Tenant},
                        };

                            var lengthdataB = dataB.Count();
                            for (var i = 0; i < lengthdataB; i++)
                            {
                                _uow.DetailCORepository.Insert(dataB[i]);
                                _uow.Commit();
                            }

                            var calFine = 0;

                            data.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == data.Room);
                            var dataDTT = _uow.DetailCORepository.GetMulti(d => d.Tenant == data.Id);
                            foreach (var item in dataDTT)
                            {
                                calFine = calFine + item.Amount;
                            }


                            data.Fine = calFine;
                            data.Refund = data.Rooms.Deposit - calFine;

                        }



                    }
                    else
                    {
                        // var calFine = 0;

                        data.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == data.Room);
                        List<DetailCO> list = new List<DetailCO>();
                        var dataDTT = _uow.DetailCORepository.GetMulti(d => d.Tenant == data.Id);
                        if (dataDTT != null)
                        {


                            foreach (var item in dataDTT)
                            {
                                list.Add(item);
                            }

                            var length = list.Count();

                            for (var i = 0; i < length; i++)
                            {
                                _uow.DetailCORepository.Delete(list[i]);
                                _uow.Commit();
                            }

                            data.Fine = 0;
                            data.Refund = data.Rooms.Deposit;
                        }
                        else
                        {
                            data.Fine = 0;
                            data.Refund = data.Rooms.Deposit;
                        }




                    }

                    _uow.TenantRepository.Update(data);
                    _uow.Commit();
                }

                return Json(true);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveDetailCO(int fine, [FromBody] List<DetailCO> obj)
        {

            try
            {
                var length = obj.Count();
                for (var i = 0; i < length; i++)
                {
                    var data = _uow.DetailCORepository.GetSingleByCondition(d => d.Id == obj[i].Id);
                    if (data == null)
                    {
                        var dataD = _uow.DetailCORepository.GetAll().Count();
                        if (dataD == 0)
                        {
                            obj[i].Id = 1;
                        }
                        else
                        {
                            var maxid = _uow.DetailCORepository.GetAll().Max(d => d.Id);
                            obj[i].Id = maxid + 1;

                        }


                        _uow.DetailCORepository.Insert(obj[i]);
                        _uow.Commit();
                    }
                    else
                    {
                        data.Detail = obj[i].Detail;
                        data.Amount = obj[i].Amount;

                        _uow.DetailCORepository.Update(obj[i]);
                        _uow.Commit();

                    }



                }

                var dataT = _uow.TenantRepository.GetSingleByCondition(t => t.Id == obj[0].Tenant);

                dataT.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == dataT.Room);

                if (dataT != null)
                {
                    dataT.Fine = fine;
                    dataT.Refund = dataT.Rooms.Deposit - dataT.Fine;
                }

                _uow.TenantRepository.Update(dataT);
                _uow.Commit();

                return Json(true);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult DelDetailCO([FromBody] List<DetailCO> obj)
        {
            try
            {
                var length = obj.Count();

                var dataT = _uow.TenantRepository.GetSingleByCondition(d => d.Id == obj[0].Tenant);
                dataT.Fine = 0;

                _uow.TenantRepository.Update(dataT);
                _uow.Commit();

                for (var i = 0; i < length; i++)
                {
                    var data = _uow.DetailCORepository.GetSingleByCondition(d => d.Id == obj[i].Id);
                    if (data != null)
                    {
                        _uow.DetailCORepository.Delete(obj[i]);
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


        [HttpGet]
        public IActionResult GetDetailCO(int tid)
        {

            try
            {
                var data = _uow.DetailCORepository.GetMulti(t => t.Tenant == tid).ToList();

                return Ok(data);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult ConfirmCO(int id)
        {
            try
            {
                var data = _uow.TenantRepository.GetSingleByCondition(t => t.Id == id);
                if (data != null)
                {
                    var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ออกแล้ว");
                    data.Status = status.Id;

                    _uow.TenantRepository.Update(data);
                    _uow.Commit();

                    var room = _uow.RoomRepository.GetSingleByCondition(r => r.Id == data.Room);
                    var statusR = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ว่าง");

                    room.Status = statusR.Id;

                    _uow.RoomRepository.Update(room);
                    _uow.Commit();

                }
                return Json(true);
            }

            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult DeleteCO(int id)
        {
            try
            {
                var data = _uow.TenantRepository.GetSingleByCondition(t => t.Id == id);
                if (data != null)
                {
                    data.DateOut = "-";
                    data.Fine = 0;
                    data.Refund = 0;

                    _uow.TenantRepository.Update(data);
                    _uow.Commit();


                    List<DetailCO> list = new List<DetailCO>();
                    var dataDTT = _uow.DetailCORepository.GetMulti(d => d.Tenant == data.Id);
                    if (dataDTT != null)
                    {
                        foreach (var item in dataDTT)
                        {
                            list.Add(item);
                        }

                        var length = list.Count();

                        for (var i = 0; i < length; i++)
                        {
                            _uow.DetailCORepository.Delete(list[i]);
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

        [HttpGet]
        public IActionResult GetRecordList()
        {

            try
            {
                List<Tenant> list = new List<Tenant>();
                var data = _uow.TenantRepository.GetMulti(t => t.Statuses.Name == "ออกแล้ว").OrderByDescending(t => t.DateOut.Substring(6, 4))
                .ThenByDescending(t => t.DateOut.Substring(3, 2)).ThenByDescending(t => t.DateOut.Substring(0, 2)).ToList();

                foreach(var item in data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == item.Room);
                    item.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(f => f.Id == item.Rooms.Floor);
                    list.Add(item);
                }

                return Ok(list);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }
    }
}

