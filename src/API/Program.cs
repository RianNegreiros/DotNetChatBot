using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerExtension();

builder.Services.AddCorsExtension(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API for a Chat Bot");
    });
}

app.UseHttpsRedirection();

app.MapGet("/prompt/{text}", async (string text, HttpContext httpContext) =>
{
    var languageModelApiKey = app.Configuration["LANGUAGE_MODEL_API_KEY"];
    var languageModelUrl = $"https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key={languageModelApiKey}";

    var payload = new
    {
        prompt = new { messages = new[] { new { content = text } } },
        temperature = 0.1,
        candidate_count = 1
    };

    using var httpClient = new HttpClient();
    var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
    var response = await httpClient.PostAsync(languageModelUrl, content);
    var data = await response.Content.ReadAsStringAsync();

    Console.WriteLine(data);
    await httpContext.Response.WriteAsync(data);
})
.WithName("Generate Language Model Response")
.WithSummary("Return a Language Model Response")
.WithDescription("Return a Language Model Response from PaLM 2 API")
.WithOpenApi(generatedOperation =>
{
    var parameter = generatedOperation.Parameters[0];
    parameter.Description = "The text to be processed by the language model";
    return generatedOperation;
})
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest)
.Produces(StatusCodes.Status500InternalServerError);

app.UseCors("AllowLocalClient");

app.Run();
