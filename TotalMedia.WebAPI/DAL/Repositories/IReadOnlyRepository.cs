using TotalMedia.WebAPI.Models;

namespace TotalMedia.WebAPI.DAL.Repositories;

public interface IReadOnlyRepository<T, in TKey> where T : IEntity
{
    public Task<T> GetByIdAsync(TKey key);

    public Task<IEnumerable<T>> GetAllAsync();
}