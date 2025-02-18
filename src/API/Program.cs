using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddServicesExtension();
builder.Services.AddSwaggerExtension();
builder.Services.AddCorsExtension(builder.Configuration);
builder.Services.AddHealthChecksExtension(builder.Configuration);
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("fixed", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromSeconds(10)
            }));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API for a Chat Bot"));

app.MapHealthChecks("/health");

app.UseHttpsRedirection();

app.UseRateLimiter();

app.MapPost("/prompt/{text}", async (
    string text,
    IHttpClientFactory factory,
    HttpContext httpContext) =>
{
    var apiKey = app.Configuration["LANGUAGE_MODEL:API_KEY"];
        var geminiUrl = $"{app.Configuration["LANGUAGE_MODEL:URL"]}?key={apiKey}";

    var payload = new
    {
        contents = new[]
        {
            new { parts = new[] { new { text } } }
        }
    };

    try
    {
        using var httpClient = factory.CreateClient();
        var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync(geminiUrl, content);
        var data = await response.Content.ReadAsStringAsync();

        app.Logger.LogInformation($"Response received from Gemini API: {data}");

        await httpContext.Response.WriteAsync(data);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "An error occurred while contacting the Gemini API.");
        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await httpContext.Response.WriteAsync("Internal Server Error");
    }
})
.WithName("Generate Language Model Response")
.WithSummary("Return a Language Model Response")
.WithDescription("Return a Language Model Response from Gemini API")
.WithOpenApi(generatedOperation =>
{
    var parameter = generatedOperation.Parameters[0];
    parameter.Description = "The text to be processed by the Gemini language model";
    return generatedOperation;
})
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest)
.Produces(StatusCodes.Status500InternalServerError)
.RequireRateLimiting("fixed");

app.UseCors("AllowClient");

app.Run();
