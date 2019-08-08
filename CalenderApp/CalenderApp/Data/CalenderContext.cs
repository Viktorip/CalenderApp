using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalenderApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CalenderApp.Data
{
    public class CalenderContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<CalenderEvent> CalenderEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<CalenderEvent>().ToTable("Event");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string cs = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=CalenderDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                optionsBuilder.UseSqlServer(cs);
            }
        }
    }
}
