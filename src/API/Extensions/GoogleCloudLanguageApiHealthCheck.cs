using System.Text;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace API.Extensions;

public class GoogleColabHealthCheck(IHttpClientFactory httpClientFactory, IConfiguration configuration) : IHealthCheck
{
  private readonly HttpClient _httpClient = httpClientFactory.CreateClient();
  private readonly IConfiguration _configuration = configuration;

  public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken)
  {
    try
    {
      var languageModelApiKey = _configuration["LANGUAGE_MODEL_API_KEY"];
      var request = new HttpRequestMessage(HttpMethod.Post, $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={languageModelApiKey}")
      {
        Content = new StringContent(
          "{ \"contents\":[{\"parts\":[{\"text\":\"hello\"}]}] }",
          Encoding.UTF8,
          "application/json")
      };

      HttpResponseMessage response = await _httpClient.SendAsync(request, cancellationToken);

      if (response.IsSuccessStatusCode)
      {
        return HealthCheckResult.Healthy();
      }
      else
      {
        return HealthCheckResult.Unhealthy($"Google API responded with: {response.StatusCode} - {response.ReasonPhrase}");
      }
    }
    catch (Exception ex)
    {
      return HealthCheckResult.Unhealthy("An error occurred while contacting Google API: " + ex.Message);
    }
  }
}
