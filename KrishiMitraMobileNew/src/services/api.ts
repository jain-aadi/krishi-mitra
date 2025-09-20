import axios from 'axios';
import { RecommendationRequest, RecommendationResponse } from '../types';

// Local development server URL
const API_URL = 'http://192.168.1.217:8080/api/recommend';

export const apiService = {
  getRecommendation: async (request: RecommendationRequest): Promise<RecommendationResponse> => {
    try {
      const response = await axios.post(API_URL, request);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};