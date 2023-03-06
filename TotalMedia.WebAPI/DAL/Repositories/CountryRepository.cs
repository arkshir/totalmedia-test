using Microsoft.EntityFrameworkCore;
using TotalMedia.WebAPI.Exceptions;
using TotalMedia.WebAPI.Models;

namespace TotalMedia.WebAPI.DAL.Repositories;

internal class CountryRepository : ICountryRepository
{
    private readonly TotalMediaDbContext _db;

    public CountryRepository(TotalMediaDbContext db)
    {
        _db = db;
    }
    
    public async Task<Country> GetByIdAsync(short key)
    {
        var country = await _db.Countries.FindAsync(key);

        if (country == null)
        {
            throw new EntityNotFoundException<Country>(key);
        }
        
        return country;
    }

    public async Task<IEnumerable<Country>> GetAllAsync()
    {
        return await _db.Countries.AsNoTracking().ToListAsync();
    }
}