using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class DetailCOConfiguration : IEntityTypeConfiguration<DetailCO>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<DetailCO> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("DetailCO", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Detail).HasColumnName("Detail");
            builder.Property(t => t.Amount).HasColumnName("Amount");
          
            builder.Property(t => t.Tenant).HasColumnName("Tenant");



            builder.HasOne(d => d.Tenants)
                    .WithMany(p => p.DetailCOs)
                    .HasForeignKey(d => d.Tenant)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetailCO_Tenant");
        }
    }
}
