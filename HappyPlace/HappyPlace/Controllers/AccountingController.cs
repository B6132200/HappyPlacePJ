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
    public class AccountingController : Controller
    {
        private readonly ILogger<AccountingController> _logger;
        private IUnitOfWork _uow;

        public AccountingController(ILogger<AccountingController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetCheckOutList(int mid, string year)
        {

            try
            {
                var monthS = mid.ToString();
                if(mid < 10)
                {
                    monthS = "0" + monthS;
                }

                List<Tenant> list = new List<Tenant>();
                var data = _uow.TenantRepository.GetMulti(b => b.DateOut.Substring(3, 2) == monthS && b.DateOut.Substring(6, 4) == year).ToList();

                foreach (var item in data)
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

        [HttpPost]
        public JsonResult SaveDetailExp([FromBody] List<DetailExp> obj)
        {

            try
            {
                var length = obj.Count();
                for (var i = 0; i < length; i++)
                {
                   
                        var data = _uow.DetailExpRepository.GetSingleByCondition(d => d.Id == obj[i].Id);
                        if (data == null)
                        {
                            var dataD = _uow.DetailExpRepository.GetAll().Count();
                            if (dataD == 0)
                            {
                                obj[i].Id = 1;
                            }
                            else
                            {
                                var maxid = _uow.DetailExpRepository.GetAll().Max(d => d.Id);
                                obj[i].Id = maxid + 1;

                            }
                            _uow.DetailExpRepository.Insert(obj[i]);
                            _uow.Commit();
                        }
                        else
                        {
                            data.Detail = obj[i].Detail;
                            data.Amount = obj[i].Amount;



                            _uow.DetailExpRepository.Update(obj[i]);
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
        public JsonResult DelDetailExp([FromBody] List<DetailExp> obj)
        {
            try
            {
                var length = obj.Count();
                for (var i = 0; i < length; i++)
                {
                    var data = _uow.DetailExpRepository.GetSingleByCondition(d => d.Id == obj[i].Id);
                    if (data != null)
                    {
                        _uow.DetailExpRepository.Delete(obj[i]);
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
        public IActionResult GetDetailExp(int mid, string year)
        {

            try
            {
                var data = _uow.DetailExpRepository.GetMulti(d => d.Month == mid && d.Year == year).ToList();
                var data2 = data;

                return Ok(data);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        
    }
}
