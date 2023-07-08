using HappyPlace.Data.Context;
using HappyPlace.Data.Repositories.Generic;
using HappyPlace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories
{
    public class DetailExpRepository : GenericRepository<DetailExp>
    {
        private readonly ApplicationDbContext _context;
        public DetailExpRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
