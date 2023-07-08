using HappyPlace.Data.Context;
using HappyPlace.Data.Repositories.Generic;
using HappyPlace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories
{
    public class StatusRepository : GenericRepository<Status>
    {
        private readonly ApplicationDbContext _context;
        public StatusRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
