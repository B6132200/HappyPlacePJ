using HappyPlace.Data.Context;
using HappyPlace.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {

        private FloorRepository FloorRepo { get; set; }
        private RoomRepository RoomRepo { get; set; }
        private StatusRepository StatusRepo { get; set; }
        private DefaultRepository DefaultRepo { get; set; }
        private TenantRepository TenantRepo { get; set; }
        private BookRepository BookRepo { get; set; }
        private BillRepository BillRepo { get; set; }
        private MonthRepository MonthRepo { get; set; }
        private DetailCORepository DetailCORepo { get; set; }
        private DetailExpRepository DetailExpRepo { get; set; }

       
        private readonly ApplicationDbContext _dbContext;



        public UnitOfWork(ApplicationDbContext context)
        {
            _dbContext = context;
        }




        public FloorRepository FloorRepository => FloorRepo == null ? new FloorRepository(_dbContext) : FloorRepository;

        public RoomRepository RoomRepository => RoomRepo == null ? new RoomRepository(_dbContext) : RoomRepository;

        public StatusRepository StatusRepository => StatusRepo == null ? new StatusRepository(_dbContext) : StatusRepository;
        public DefaultRepository DefaultRepository => DefaultRepo == null ? new DefaultRepository(_dbContext) : DefaultRepository;
        public TenantRepository TenantRepository => TenantRepo == null ? new TenantRepository(_dbContext) : TenantRepository;
        public BookRepository BookRepository => BookRepo == null ? new BookRepository(_dbContext) : BookRepository;
        public BillRepository BillRepository => BillRepo == null ? new BillRepository(_dbContext) : BillRepository;
        public MonthRepository MonthRepository => MonthRepo == null ? new MonthRepository(_dbContext) : MonthRepository;
        public DetailCORepository DetailCORepository => DetailCORepo == null ? new DetailCORepository(_dbContext) : DetailCORepository;
        public DetailExpRepository DetailExpRepository => DetailExpRepo == null ? new DetailExpRepository(_dbContext) : DetailExpRepository;

        public int Commit()
        {
            return _dbContext.SaveChanges();
        }
    }
}
