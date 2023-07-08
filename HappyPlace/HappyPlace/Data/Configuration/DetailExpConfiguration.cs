using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class DetailExpConfiguration : IEntityTypeConfiguration<DetailExp>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<DetailExp> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("DetailExp", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Detail).HasColumnName("Detail");
            builder.Property(t => t.Amount).HasColumnName("Amount");
            builder.Property(t => t.Year).HasColumnName("Year");

            builder.Property(t => t.Month).HasColumnName("Month");



            builder.HasOne(d => d.Months)
                    .WithMany(p => p.DetailExps)
                    .HasForeignKey(d => d.Month)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetailExp_Month");
        }
    }
}
