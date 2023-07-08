using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Controllers
{
    public class FloorController : Controller
    {
        private readonly ILogger<FloorController> _logger;

        public FloorController(ILogger<FloorController> logger)
        {
            _logger = logger;
        }

        
    }
}
