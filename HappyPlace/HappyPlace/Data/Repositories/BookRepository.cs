using HappyPlace.Data.Context;
using HappyPlace.Data.Repositories.Generic;
using HappyPlace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories
{
    public class BookRepository : GenericRepository<Book>
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
