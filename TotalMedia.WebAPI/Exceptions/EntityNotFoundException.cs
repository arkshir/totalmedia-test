namespace TotalMedia.WebAPI.Exceptions;

public class EntityNotFoundException<T> : Exception
{
    private readonly object _key;
    
    public EntityNotFoundException(object key)
    {
        _key = key;
    }

    public override string Message => $"An entity {nameof(T)} with key: {_key} was not found";
}