using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class BillConfiguration : IEntityTypeConfiguration<Bill>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Bill> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Bill", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.RoomBill).HasColumnName("RoomBill");
            builder.Property(t => t.WaterBill).HasColumnName("WaterBill");
            builder.Property(t => t.ElecBill).HasColumnName("ElecBill");
            builder.Property(t => t.EmeterStart).HasColumnName("EmeterStart");
            builder.Property(t => t.EmeterLast).HasColumnName("EmeterLast");
            builder.Property(t => t.TotalBill).HasColumnName("TotalBill");
            builder.Property(t => t.Date).HasColumnName("Date");
            builder.Property(t => t.DatePay).HasColumnName("DatePay");
            builder.Property(t => t.Deadline).HasColumnName("Deadline");
            builder.Property(t => t.LateRate).HasColumnName("LateRate");
            builder.Property(t => t.DayLate).HasColumnName("DayLate");
            builder.Property(t => t.LateBill).HasColumnName("LateBill");
            builder.Property(t => t.TotalBillLast).HasColumnName("TotalBillLast");
            builder.Property(t => t.PaidBy).HasColumnName("PaidBy");

            builder.Property(t => t.Month).HasColumnName("Month");
            builder.Property(t => t.Room).HasColumnName("Room");
            builder.Property(t => t.Tenant).HasColumnName("Tenant");
            builder.Property(t => t.Status).HasColumnName("Status");

            


            builder.HasOne(d => d.Rooms)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.Room)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bill_Room");

            builder.HasOne(d => d.Months)
                   .WithMany(p => p.Bills)
                   .HasForeignKey(d => d.Month)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_Bill_Month"); 
            
            builder.HasOne(d => d.Tenants)
                   .WithMany(p => p.Bills)
                   .HasForeignKey(d => d.Tenant)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_Bill_Tenant");

            builder.HasOne(d => d.Statuses)
                  .WithMany(p => p.Bills)
                  .HasForeignKey(d => d.Status)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_Bill_Status");

        }
    }
}
