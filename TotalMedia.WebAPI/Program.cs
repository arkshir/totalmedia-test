using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TotalMedia.WebAPI.DAL;
using TotalMedia.WebAPI.DAL.Repositories;
using TotalMedia.WebAPI.ViewModels;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(p =>
  {
    p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
  });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddEnvironmentVariables("WEBAPI_");

builder.Services.AddScoped<ICountryRepository, CountryRepository>();

builder.Services.AddDbContext<TotalMediaDbContext>(options =>
{
  var connectionString = builder.Configuration.GetValue<string?>("CONNECTION_STRING") ??
                         builder.Configuration.GetConnectionString("Default");

  options.UseSqlServer(connectionString);
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();

// app.UseHttpsRedirection();

app.MapGet("/countries", async ([FromServices] ICountryRepository countryRepository) =>
    {
      var countries = (await countryRepository.GetAllAsync()).Select(c => new CountryViewModel(c));

      return countries;
    })
.WithName("GetCountries");

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;

  var context = services.GetRequiredService<TotalMediaDbContext>();

  if (context.Database.GetPendingMigrations().Any())
  {
    context.Database.Migrate();
  }
}

app.Run();