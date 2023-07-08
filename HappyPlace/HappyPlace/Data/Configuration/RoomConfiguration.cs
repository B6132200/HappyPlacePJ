using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Room> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Room", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Name).HasColumnName("Name");
            builder.Property(t => t.Facilities).HasColumnName("Facilities");
            builder.Property(t => t.RoomRate).HasColumnName("RoomRate");
            builder.Property(t => t.WaterRate).HasColumnName("WaterRate");
            builder.Property(t => t.ElectricRate).HasColumnName("ElectricRate");
            builder.Property(t => t.Deposit).HasColumnName("Deposit");
            builder.Property(t => t.RentInAdvance).HasColumnName("RentInAdvance");
            builder.Property(t => t.Lease).HasColumnName("Lease");
           
            builder.Property(t => t.Floor).HasColumnName("Floor");
            builder.Property(t => t.Status).HasColumnName("Status");


            builder.HasOne(d => d.Floors)
                    .WithMany(p => p.Rooms)
                    .HasForeignKey(d => d.Floor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Room_Floos");

            builder.HasOne(d => d.Statuses)
                   .WithMany(p => p.Rooms)
                   .HasForeignKey(d => d.Status)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_Room_Status");

        }
    }
}
