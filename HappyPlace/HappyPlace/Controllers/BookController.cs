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
    public class BookController : Controller
    {
        private readonly ILogger<BookController> _logger;
        private IUnitOfWork _uow;

        public BookController(ILogger<BookController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Book()
        {
            return View();
        }

        public IActionResult CheckIn()
        {
            return View();
        }


        [HttpPost]
        public JsonResult SaveBook([FromBody] Book obj)

        {
            try
            {

                var countdata = _uow.BookRepository.GetAll().Count();
                if (countdata == 0)
                {
                    obj.Id = 1;
                }
                else
                {
                    var maxId = _uow.BookRepository.GetAll().Max(r => r.Id);
                    obj.Id = maxId + 1;
                }

               
                _uow.BookRepository.Insert(obj);
                _uow.Commit();



                var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "จอง");
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
        public IActionResult GetBookList()
        {
            try
            {
                List<Book> listBook = new List<Book>();
                var Data = _uow.BookRepository.GetAll().OrderBy(x => x.DateCI.Substring(6, 4)).
                    ThenBy(x => x.DateCI.Substring(3, 2)).ThenBy(x => x.DateCI.Substring(0, 2)).ToList();


                foreach (var item in Data)
                {
                    item.Rooms = _uow.RoomRepository.GetSingleByCondition(m => m.Id == item.Room);

                    listBook.Add(item);

                }
                return Ok(listBook);
            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveEditBook([FromBody] Book obj)

        {
            try
            {
                var data = _uow.BookRepository.GetSingleByCondition(s => s.Id == obj.Id);

                if (data != null)
                {
                    data.DateCI = obj.DateCI;



                    _uow.BookRepository.Update(data);
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
        public JsonResult DeleteBook(int id)

        {
            try
            {
                var data = _uow.BookRepository.GetSingleByCondition(s => s.Id == id);

                if (data != null)
                {
                    var status = _uow.StatusRepository.GetSingleByCondition(s => s.Name == "ว่าง");
                    var room = _uow.RoomRepository.GetSingleByCondition(s => s.Id == data.Room);

                    room.Status = status.Id;

                    _uow.RoomRepository.Update(room);
                    _uow.Commit();

                    _uow.BookRepository.Delete(data);
                    _uow.Commit();


                    return Json(true);
                }
                else
                {
                    return Json("Cannot delete");
                }


            }
            catch (Exception e)
            {
                return Json(e.InnerException.Message);
            }
        }

        [HttpGet]
        public IActionResult GetBook(int id)
        {
            try
            {

                
                var data = _uow.BookRepository.GetSingleByCondition(b => b.Id == id);

                data.Rooms = _uow.RoomRepository.GetSingleByCondition(r => r.Id == data.Room);
                data.Rooms.Floors = _uow.FloorRepository.GetSingleByCondition(f => f.Id == data.Rooms.Floor);
                data.Rooms.Statuses = _uow.StatusRepository.GetSingleByCondition(s => s.Id == data.Rooms.Status);

                    

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public JsonResult SaveTenant([FromBody] Tenant obj)

        {
            try
            {
                var idB = obj.Id;

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

                var dataB = _uow.BookRepository.GetSingleByCondition(b => b.Id == idB);
                if (dataB != null)
                {
                    _uow.BookRepository.Delete(dataB);
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
