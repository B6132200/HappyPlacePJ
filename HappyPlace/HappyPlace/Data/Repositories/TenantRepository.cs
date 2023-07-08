using HappyPlace.Data.Context;
using HappyPlace.Data.Repositories.Generic;
using HappyPlace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories
{
    public class TenantRepository : GenericRepository<Tenant>
    {
        private readonly ApplicationDbContext _context;
        public TenantRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
