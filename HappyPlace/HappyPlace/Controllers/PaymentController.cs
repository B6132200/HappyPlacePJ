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
    public class PaymentController : Controller
    {
        private readonly ILogger<PaymentController> _logger;
        private IUnitOfWork _uow;

        public PaymentController(ILogger<PaymentController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult EditBill([FromBody] Bill obj)

        {
            try
            {
                var data = _uow.BillRepository.GetSingleByCondition(s => s.Id == obj.Id);

                if (data != null)
                {
                    var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ชำระแล้ว");
                    data.Status = status.Id;

                    data.DatePay = obj.DatePay;
                    data.DayLate = obj.DayLate;
                    data.LateBill = obj.LateBill;
                    data.TotalBillLast = obj.TotalBillLast;
                    data.PaidBy = obj.PaidBy;



                    _uow.BillRepository.Update(data);
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
        public JsonResult EditSetup(string dl, int lr, [FromBody] List<Bill> obj)
        {
            var length = obj.Count();
            try
            {
                for(var i = 0; i < length; i++)
                {
                    var data = _uow.BillRepository.GetSingleByCondition(b => b.Id == obj[i].Id);

                    data.Deadline = dl;
                    data.LateRate = lr;
                    data.LateBill = 0;
                    data.DayLate = 0;

                    _uow.BillRepository.Update(data);
                    _uow.Commit();
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
