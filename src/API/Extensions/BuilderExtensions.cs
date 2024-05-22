using Microsoft.OpenApi.Models;

namespace API.Extensions;

public static class BuilderExtensions
{
    public static void AddSwaggerExtension(this IServiceCollection services)
    {
        services.AddSwaggerGen(options => options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Chat bot API",
            Description = "A ASP.NET Core 8 minimal API to generate messages for a chat bot using PaLM 2 API",
        }));
    }

    public static void AddCorsExtension(this IServiceCollection services, IConfiguration config)
    {
        var clientUrl = config["Client_Url"] ?? "http://localhost:3000";

        services.AddCors(options => options.AddPolicy(name: "AllowClient", policy =>
        policy.WithOrigins(clientUrl)
        .AllowAnyHeader()
        .WithMethods("POST")));
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