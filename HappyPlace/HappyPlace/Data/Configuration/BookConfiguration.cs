using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Book> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Book", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Name).HasColumnName("Name");
            builder.Property(t => t.Gender).HasColumnName("Gender");
            builder.Property(t => t.Phone).HasColumnName("Phone");
            builder.Property(t => t.Deposit).HasColumnName("Deposit");
            builder.Property(t => t.EntranceFee).HasColumnName("EntranceFee");
            builder.Property(t => t.DateCI).HasColumnName("DateCI");
            builder.Property(t => t.DateB).HasColumnName("DateB");
            builder.Property(t => t.Room).HasColumnName("Room");


            builder.HasOne(d => d.Rooms)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.Room)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Book_Room");
        }
    }
}
