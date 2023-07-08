using HappyPlace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.Configuration
{
    public class FloorConfiguration : IEntityTypeConfiguration<Floor>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Floor> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Floor", "dbo");
            builder.Property(t => t.Id).HasColumnName("Id");
            builder.Property(t => t.Name).HasColumnName("Name");


        }
    }
}
