using HappyPlace.Data.Configuration;
using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.LazyLoadingEnabled = false;
        }



        public virtual DbSet<Floor> Floors { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<Default> Defaults { get; set; }
        public virtual DbSet<Tenant> Tenants { get; set; }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<Month> Months { get; set; }
        public virtual DbSet<DetailCO> DetailCOs { get; set; }
        public virtual DbSet<DetailExp> DetailExps { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new FloorConfiguration());
            modelBuilder.ApplyConfiguration(new RoomConfiguration());
            modelBuilder.ApplyConfiguration(new StatusConfiguration());
            modelBuilder.ApplyConfiguration(new DefaultConfiguration());
            modelBuilder.ApplyConfiguration(new TenantConfiguration());
            modelBuilder.ApplyConfiguration(new BookConfiguration());
            modelBuilder.ApplyConfiguration(new BillConfiguration());
            modelBuilder.ApplyConfiguration(new MonthConfiguration());
            modelBuilder.ApplyConfiguration(new DetailCOConfiguration());
            modelBuilder.ApplyConfiguration(new DetailExpConfiguration());
        }
    }
}
