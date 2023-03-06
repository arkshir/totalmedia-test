using System.Text.Json.Serialization;
using TotalMedia.WebAPI.Models;

namespace TotalMedia.WebAPI.ViewModels;

internal class CountryViewModel
{
    public CountryViewModel(Country country)
    {
        Name = country.Name;
        VATs = country.VATs.OrderBy(x => x).ToArray();
        Locale = country.Locale;
        Currency = country.Currency;
    }
    
    public string Name { get; }

    public string Locale { get; }

    public string Currency { get; }
    
    [JsonPropertyName("vats")] 
    public decimal[] VATs { get; }
}