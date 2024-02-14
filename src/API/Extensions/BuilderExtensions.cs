using Microsoft.OpenApi.Models;

namespace API.Extensions;

public static class BuilderExtensions
{
  public static void AddSwaggerExtension(this IServiceCollection services)
  {
    services.AddSwaggerGen(options =>
    {
      options.SwaggerDoc("v1", new OpenApiInfo
      {
        Version = "v1",
        Title = "Chat bot API",
        Description = "A ASP.NET Core 8 minimal API to generate messages for a chat bot using PaLM 2 API",
        Contact = new OpenApiContact
        {
          Name = "Website",
          Url = new Uri("https://riannegreiros.dev"),
        },
      });
    });
  }

  public static void AddCorsExtension(this IServiceCollection services, IConfiguration config)
  {
    services.AddCors(options =>
    {
      options.AddPolicy(name: "AllowLocalClient", policy =>
      policy.WithOrigins([
        config["Client_Url"] ?? "http://localhost:3000",
        "http://client:3000"
      ])
      .AllowAnyHeader()
      .WithMethods("GET"));
    });
  }

  public static void AddHealthChecksExtension(this IServiceCollection services, IConfiguration config)
  {
    services.AddHttpClient();
    services.AddHealthChecks()
      .AddCheck("google-api", new GoogleColabHealthCheck(services.BuildServiceProvider().GetRequiredService<IHttpClientFactory>(), config, services.BuildServiceProvider().GetRequiredService<ILogger<GoogleColabHealthCheck>>()));
  }

  public static void AddServicesExtension(this IServiceCollection services)
  {
    services.AddHttpClient();
  }
}
