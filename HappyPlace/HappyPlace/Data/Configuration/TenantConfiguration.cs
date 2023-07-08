using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Tenant> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Tenant", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Tn).HasColumnName("Tn");
            builder.Property(t => t.Name).HasColumnName("Name");
            builder.Property(t => t.Gender).HasColumnName("Gender");
            builder.Property(t => t.Age).HasColumnName("Age");
            builder.Property(t => t.Phone).HasColumnName("Phone");
            builder.Property(t => t.Address).HasColumnName("Address");
            builder.Property(t => t.Total).HasColumnName("Total");
            builder.Property(t => t.EmeterStart).HasColumnName("EmeterStart");
            builder.Property(t => t.WaterBill).HasColumnName("WaterBill");
            builder.Property(t => t.DateCI).HasColumnName("DateCI");
            builder.Property(t => t.DateOut).HasColumnName("DateOut");
            builder.Property(t => t.Fine).HasColumnName("Fine");
            builder.Property(t => t.Refund).HasColumnName("Refund");
            

            builder.Property(t => t.Room).HasColumnName("Room");
            builder.Property(t => t.Status).HasColumnName("Status");



            builder.HasOne(d => d.Rooms)
                    .WithMany(p => p.Tenants)
                    .HasForeignKey(d => d.Room)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tenant_Room"); 
            
            builder.HasOne(d => d.Statuses)
                    .WithMany(p => p.Tenants)
                    .HasForeignKey(d => d.Status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tenant_Status");
        }
    }
}
