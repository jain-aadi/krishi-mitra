package kishanMitra.demo.controller;

import kishanMitra.demo.dto.RecommendationRequest;
import kishanMitra.demo.dto.RecommendationResponse;
import kishanMitra.demo.service.AIService;
import kishanMitra.demo.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.ZonedDateTime;

@RestController
@RequestMapping("/api") 
public class RecommendationController {

    private final LocationService locationService;
    private final AIService aiService;

    // Spring automatically "injects" the service instances you created earlier
    public RecommendationController(LocationService locationService, AIService aiService) {
        this.locationService = locationService;
        this.aiService = aiService;
    }

    @PostMapping("/recommend") // Defines the endpoint: POST http://localhost:8080/api/recommend
    public RecommendationResponse getRecommendation(@RequestBody RecommendationRequest request) {

        // --- Step 1: Get Location from Coordinates ---
        String[] location = locationService.getLocationFromCoordinates(request.getLatitude(), request.getLongitude());
        String state = location[0];
        String district = location[1];

        // --- Step 2: Determine Current Season ---
        String season = getCurrentSeason();

        // --- Step 3: Call AI Service Layer 1 (Clean Query) ---
        String cleanedQuery = aiService.getCleanedQuery(request.getMessage(), request.getLanguageCode());

        // --- Step 4: Call AI Service Layer 2 (Get Recommendations) ---
        String englishResponse = aiService.getCropRecommendations(cleanedQuery, state, district, season);

        // --- Step 5: Call AI Service Layer 3 (Translate Response) ---
        String finalResponse = aiService.translateResponse(englishResponse, request.getLanguageCode());

        // --- Step 6: Return the final response to the mobile app ---
        return new RecommendationResponse(finalResponse);
    }

    /**
     * A private helper method to determine the current agricultural season in India.
     */
    private String getCurrentSeason() {
        // Gets the current month from the server's clock
        Month month = ZonedDateTime.now().getMonth();
        return switch (month) {
            case JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER -> "Kharif (Monsoon)";
            case NOVEMBER, DECEMBER, JANUARY, FEBRUARY, MARCH -> "Rabi (Winter)";
            case APRIL, MAY -> "Zaid (Summer)";
        };
    }
}
