package kishanMitra.demo.service;

import kishanMitra.demo.dto.gemini.GeminiRequest;
import kishanMitra.demo.dto.gemini.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    // The full, correct URL for the Gemini 1.5 Flash model
    private final String geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * This is the main method that handles all communication with the Gemini API.
     * @param prompt The specific question or instruction for the AI.
     * @return The text response from the AI.
     */
    private String callGeminiApi(String prompt) {
        // 1. Create Headers and add the API Key
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-goog-api-key", apiKey);

        // 2. Create the Request Body using our DTO
        GeminiRequest requestBody = new GeminiRequest(prompt);

        // 3. Wrap the body and headers into a single HttpEntity
        HttpEntity<GeminiRequest> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 4. Make the POST request to the Gemini API
            GeminiResponse response = restTemplate.postForObject(geminiApiUrl, entity, GeminiResponse.class);

            // 5. Extract and return the clean text from the response
            return response != null ? response.getFirstCandidateText() : "No response from AI.";
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            return "Error: Could not get a response from the AI.";
        }
    }

    /**
     * AI Layer 1: Cleans and translates the user's raw query.
     */
    public String getCleanedQuery(String userMessage, String languageCode) {
        String prompt = "You are a helpful assistant for Indian farmers. A farmer speaking in language code '" + languageCode + "' sent this query: '" + userMessage + "'. Your job is to clean this query, translate it to simple English, and extract any specific keywords. Respond ONLY with the cleaned English query.";
        return callGeminiApi(prompt);
    }

    /**
     * AI Layer 2: Acts as the expert to get crop recommendations.
     */
    public String getCropRecommendations(String cleanedQuery, String state, String district, String season) {
        String prompt = "You are an expert Indian agronomist providing advice. Based on the following data, provide crop recommendations. Respond ONLY with a simple, natural language sentence for the farmer.\n" +
                "- Location: " + district + ", " + state + ", India\n" +
                "- Current Season: " + season + "\n" +
                "- Farmer's Query: " + cleanedQuery;
        return callGeminiApi(prompt);
    }

    /**
     * Final Step: Translates the final English response back to the user's language.
     */
    public String translateResponse(String textToTranslate, String targetLanguageCode) {
        if ("en".equalsIgnoreCase(targetLanguageCode)) {
            return textToTranslate;
        }
        String prompt = "Translate the following agricultural advice to the language with code '" + targetLanguageCode + "'. Respond ONLY with the translated text.\nText: " + textToTranslate;
        return callGeminiApi(prompt);
    }
}
