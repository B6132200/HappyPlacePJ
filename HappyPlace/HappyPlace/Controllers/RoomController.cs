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
    public class RoomController : Controller
    {
        private readonly ILogger<RoomController> _logger;
        private IUnitOfWork _uow;

        public RoomController(ILogger<RoomController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveFloor([FromBody] Floor obj)

        {
            try
            {

                var maxId = _uow.FloorRepository.GetAll().Count();
                obj.Id = maxId == 0 ? 1 : maxId + 1;

                _uow.FloorRepository.Insert(obj);
                _uow.Commit();

                return Json(true);

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetFloorList()
        {
            try
            {
                var data = _uow.FloorRepository.GetAll().OrderBy(o => o.Id);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveEditFloor([FromBody] Floor obj)

        {
            try
            {
                var data = _uow.FloorRepository.GetSingleByCondition(s => s.Id == obj.Id);

                if (data != null)
                {
                    data.Name = obj.Name;



                    _uow.FloorRepository.Update(data);
                    _uow.Commit();


                    return Json(true);
                }
                else
                {
                    return Json("Cannot Update");
                }


            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveRoom([FromBody] Room obj)

        {

            try
            {
                var countdata = _uow.RoomRepository.GetAll().Count();
                if(countdata == 0)
                {
                    obj.Id = 1;
                }
                else
                {
                    var maxId = _uow.RoomRepository.GetAll().Max(r => r.Id);
                    obj.Id = maxId + 1;
                }
                

                _uow.RoomRepository.Insert(obj);
                _uow.Commit();

                return Json(true);

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveDefault([FromBody] Default obj)

        {
            try
            {
                var countData = _uow.DefaultRepository.GetAll().Count();
                if(countData == 0)
                {

                    obj.Id = 1;

                    _uow.DefaultRepository.Insert(obj);
                    _uow.Commit();

                    return Json(true);
                }
                else
                {
                    var checkData = _uow.DefaultRepository.GetSingleByCondition(s => s.Floor == obj.Floor);
                    if (checkData == null)
                    {
                        var maxData = _uow.DefaultRepository.GetAll().Count();
                        obj.Id = maxData == 0 ? 1 : maxData + 1;

                        _uow.DefaultRepository.Insert(obj);
                        _uow.Commit();

                        return Json(true);
                    }
                    else
                    {
                        checkData.Name = obj.Name;
                        checkData.Facilities = obj.Facilities;
                        checkData.RoomRate = obj.RoomRate;
                        checkData.WaterRate = obj.WaterRate;
                        checkData.ElectricRate = obj.ElectricRate;
                        checkData.Deposit = obj.Deposit;
                        checkData.RentInAdvance = obj.RentInAdvance;
                        checkData.Lease = obj.Lease;
                        //checkData.Floor = obj.Floor;
                        //checkData.Status = obj.Status;
                        _uow.DefaultRepository.Update(checkData);
                        _uow.Commit();

                        return Json(true);
                    }
                }
                
               

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetDefault(int idFloor)
        {
            try
            {
                var data = _uow.DefaultRepository.GetSingleByCondition(o => o.Floor == idFloor);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetRoom(int idFloor)
        {
            try
            {
               
                List<Room> listRoom = new List<Room>();
                var data = _uow.RoomRepository.GetMulti(o => o.Floor == idFloor).ToList();


                foreach (var item in data)
                {
                    item.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Floor);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);
                    listRoom.Add(item);

                }
                return Ok(listRoom);
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
                List<Room> listRoom = new List<Room>();
                var Data = _uow.RoomRepository.GetAll().ToList();
                

                foreach (var item in Data)
                {
                    item.Floors = _uow.FloorRepository.GetSingleByCondition(m => m.Id == item.Floor);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);
                    listRoom.Add(item);

                }
                return Ok(listRoom);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveEditRoom([FromBody] Room obj)

        {
            try
            {
                var data = _uow.RoomRepository.GetSingleByCondition(s => s.Id == obj.Id);
               

                if (data != null)
                {
                  
                    data.Facilities = obj.Facilities;
                    data.RoomRate = obj.RoomRate;
                    data.WaterRate = obj.WaterRate;
                    data.ElectricRate = obj.ElectricRate;
                    data.Deposit = obj.Deposit;
                    data.RentInAdvance = obj.RentInAdvance;
                    data.Lease = obj.Lease;
                    data.Floor = obj.Floor;
                    data.Status = obj.Status;

                    _uow.RoomRepository.Update(data);
                    _uow.Commit();

                }
              
                else
                {
                    return Json("Cannot Update");
                }

                return Json(true);



            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveEditRandT([FromBody] Room obj, string phone, int total)

        {
            try
            {
                var data = _uow.RoomRepository.GetSingleByCondition(s => s.Id == obj.Id);
                var data1 = _uow.TenantRepository.GetSingleByCondition(t => t.Room == obj.Id);

                if (data != null)
                {
                    data.Name = obj.Name;
                    data.Facilities = obj.Facilities;
                    data.RoomRate = obj.RoomRate;
                    data.WaterRate = obj.WaterRate;
                    data.ElectricRate = obj.ElectricRate;
                    data.Deposit = obj.Deposit;
                    data.RentInAdvance = obj.RentInAdvance;
                    data.Lease = obj.Lease;
                    data.Floor = obj.Floor;
                    data.Status = obj.Status;

                    _uow.RoomRepository.Update(data);
                    _uow.Commit();
                    
                }
                if (data1 != null)
                {
                    if(phone != null)
                    {
                        data1.Phone = phone;
                    }
                    if(total != 0)
                    {
                        data1.Total = total;
                    }
                   
                    
                    data1.WaterBill = data1.Total * data.WaterRate;

                    _uow.TenantRepository.Update(data1);
                    _uow.Commit();
                }
                else
                {
                    return Json("Cannot Update");
                }

                return Json(true);



            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }


        [HttpPost]
        public JsonResult SaveEditRoomAll([FromBody] Room obj)

        {
            try
            {
                var countRoom = _uow.RoomRepository.GetAll().Count();
              
                for (var i = 1; i <= countRoom; i++)
                {
                   
                    var data = _uow.RoomRepository.GetSingleByCondition(s => s.Id == i);
                    

                    if (data != null)
                    {
                        
                        data.WaterRate = obj.WaterRate;
                        data.ElectricRate = obj.ElectricRate;
                        data.Lease = obj.Lease;


                        _uow.RoomRepository.Update(data);
                        _uow.Commit();


                        var dataTenant = _uow.TenantRepository.GetSingleByCondition(s => s.Room == i);
                        if(dataTenant != null)
                        {
                            dataTenant.WaterBill = dataTenant.Total * obj.WaterRate;

                            _uow.TenantRepository.Update(dataTenant);
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

        [HttpPost]
        public JsonResult SaveRoomAuto(int amount, [FromBody] Room obj)

        {
            try
            {

                for (var i = 0; i < amount; i++)
                {

                    
                    var maxdata = _uow.RoomRepository.GetMulti(s => s.Floor == obj.Floor).Count();
                    maxdata = maxdata + 1;
                    var nextdataSt = maxdata.ToString();
                    nextdataSt = nextdataSt.PadLeft(2, '0');

                   // var dataDefault = data;
                    var idFloor = obj.Floor.ToString();
                    var maxId = _uow.RoomRepository.GetAll().Count();
                    obj.Id = maxId + 1;
                    obj.Name = idFloor + nextdataSt;
                    
                    _uow.RoomRepository.Insert(obj);
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
        public JsonResult SaveEditRIF(string[] gname, [FromBody] Room obj)

        {
            try
            {
                for(var i = 0; i < gname.Length; i++)
                {
                    var nameRoom = gname[i];
                    var data = _uow.RoomRepository.GetSingleByCondition(s => s.Name == nameRoom);
                    if (data != null)
                    {
                        
                        data.Facilities = obj.Facilities;
                        data.RoomRate = obj.RoomRate;
                        
                        data.Deposit = obj.Deposit;
                        data.RentInAdvance = obj.RentInAdvance;

                        _uow.RoomRepository.Update(data);
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
        public JsonResult DeleteRoom([FromBody] Room obj)
        {
            try
            {
                //var draftId = int.Parse(tid);
                var data = _uow.RoomRepository.GetSingleByCondition(r => r.Id == obj.Id);

                if (data != null)
                {
                    

                    _uow.RoomRepository.Delete(data);
                    _uow.Commit();

                   
                    return Json(true);
                }
                else
                {
                    return Json("Can not Delete");
                }

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

    }


}

