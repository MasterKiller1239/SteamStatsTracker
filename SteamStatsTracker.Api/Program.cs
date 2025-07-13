using SteamStatsTracker.Application.Interfaces;
using SteamStatsTracker.Application.Services;
using SteamStatsTracker.Infrastructure;
using SteamStatsTracker.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<ISteamApiClient, SteamApiClient>();
builder.Services.AddScoped<IStatsRepository, StatsRepository>();
builder.Services.AddScoped<ISteamStatsService, SteamStatsService>();
builder.Services.AddControllers(); 
// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration); 
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapControllers();
app.UseHttpsRedirection();


app.Run();
