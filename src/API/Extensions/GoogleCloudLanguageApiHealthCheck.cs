using System.Text;

using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace API.Extensions;

public class GoogleColabHealthCheck(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<GoogleColabHealthCheck> logger) : IHealthCheck
{
    private readonly HttpClient _httpClient = httpClientFactory.CreateClient();
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<GoogleColabHealthCheck> _logger = logger;

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
                _logger.LogInformation("Google API responded with success status code.");
                return HealthCheckResult.Healthy();
            }
            else
            {
                _logger.LogError($"Google API responded with: {response.StatusCode} - {response.ReasonPhrase}");
                return HealthCheckResult.Unhealthy($"Google API responded with: {response.StatusCode} - {response.ReasonPhrase}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while contacting Google API.");
            return HealthCheckResult.Unhealthy("An error occurred while contacting Google API: " + ex.Message);
        }
    }
}
