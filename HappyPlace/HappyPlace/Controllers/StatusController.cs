using HappyPlace.Data.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Controllers
{
    public class StatusController : Controller
    {
        private readonly ILogger<StatusController> _logger;
        private IUnitOfWork _uow;

        public StatusController(ILogger<StatusController> logger, IUnitOfWork uow)
        {
            _logger = logger;
            _uow = uow;
        }

        [HttpGet]
        public IActionResult GetStatusList()
        {
            try
            {
                var data = _uow.StatusRepository.GetAll().OrderBy(o => o.Id);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
