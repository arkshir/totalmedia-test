using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TotalMedia.WebAPI.Models;

namespace TotalMedia.WebAPI.DAL;

internal class TotalMediaDbContext : DbContext
{
    public TotalMediaDbContext(DbContextOptions<TotalMediaDbContext> options) : base(options) { }
    
    internal DbSet<Country> Countries => Set<Country>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Country>(e =>
        {
            e.ToTable("Countries");
            
            e.HasKey(c => c.Id).IsClustered();
            
            e.Property(c => c.Id);

            e.Property(c => c.Name).HasMaxLength(100);

            e.Property(c => c.Locale).HasMaxLength(20);

            e.Property(c => c.Currency).HasMaxLength(3).IsFixedLength();

            e.Property(c => c.VATs)
                .HasConversion(
                    x =>
                        x.Select(y => y.ToString(CultureInfo.InvariantCulture))
                            .Aggregate((a, b) => $"{a};{b}"),
                    x =>
                        x.Split(";", StringSplitOptions.RemoveEmptyEntries)
                            .Select(Convert.ToDecimal).ToList(),
                    new ValueComparer<List<decimal>>(
                        (c1, c2) => c1!.SequenceEqual(c2!),
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                        c => c.ToList()))
                .HasMaxLength(255);

            e.HasData(
                new Country(1, "France", "fr-FR", "EUR", new List<decimal> { 5.5m, 20m, 10m }),
                new Country(2, "United Kingdom", "en-GB", "GBP", new List<decimal> { 5m, 20m }),
                new Country(3, "Portugal", "pt-PT", "EUR", new List<decimal> { 6m, 13m, 23m }),
                new Country(4, "Spain", "es-ES", "EUR", new List<decimal> { 21m, 10m }));
        });
    }
}