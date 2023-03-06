namespace TotalMedia.WebAPI.Models
{
    internal class Country : IEntity
    {
        internal Country() { }
        
        public Country(byte id, string name, string locale, string currency, List<decimal> vats)
        {
            Id = id;
            Name = name;
            Locale = locale;
            VATs = vats;
            Currency = currency;
        }

        public byte Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Locale { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public List<decimal> VATs { get; set; } = new();
    }
}