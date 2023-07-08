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
    public class CheckInController : Controller
    {
        private readonly ILogger<CheckInController> _logger;
        private IUnitOfWork _uow;

        public CheckInController(ILogger<CheckInController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveTenant([FromBody] Tenant obj)

        {
            try
            {
                var countdata = _uow.TenantRepository.GetAll().Count();
                if (countdata == 0)
                {
                    obj.Id = 1;
                    obj.DateOut = "-";
                    obj.Fine = 0;
                    obj.Refund = 0;
                }
                else
                {
                    var maxId = _uow.TenantRepository.GetAll().Max(r => r.Id);
                    obj.Id = maxId + 1;
                    obj.DateOut = "-";
                    obj.Fine = 0;
                    obj.Refund = 0;
                }

                var statusT = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ยังอยู่");
                obj.Status = statusT.Id;

              

                _uow.TenantRepository.Insert(obj);
                _uow.Commit();

               

                var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ไม่ว่าง");
                var room = _uow.RoomRepository.GetSingleByCondition(s => s.Id == obj.Room);

                room.Status = status.Id;

                _uow.RoomRepository.Update(room);
                _uow.Commit();

                return Json(true);

            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetTenantList()
        {
            try
            {
                List<Tenant> listTenant = new List<Tenant>();
                var Data = _uow.TenantRepository.GetMulti(t => t.Statuses.Name == "ยังอยู่").ToList();


                foreach (var item in Data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);
                    item.Statuses = _uow.StatusRepository.GetSingleByCondition(m => m.Id == item.Status);
                    
                    listTenant.Add(item);

                }
                return Ok(listTenant);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

    }
}
