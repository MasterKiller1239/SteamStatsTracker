using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SteamStatsTracker.Application.Interfaces;
using SteamStatsTracker.Application.Services;
using SteamStatsTracker.Infrastructure;
using SteamStatsTracker.Infrastructure.Repositories;
using System.Text;

var jwtKey = "supersekretnyklucz123"; // najlepiej z `appsettings`
var key = Encoding.ASCII.GetBytes(jwtKey);
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; 
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
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
builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapControllers();
app.UseHttpsRedirection();


app.Run();
