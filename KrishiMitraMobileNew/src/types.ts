export interface RecommendationRequest {
  message: string;
  languageCode: string;
  latitude: number;
  longitude: number;
}

export interface RecommendationResponse {
  response: string;
}

export interface Message {
  id: number;
  text: string;
  from: 'user' | 'bot';
}

export type LanguageCode = 'en' | 'hi' | 'bn' | 'gu' | 'ml';

export interface Translation {
  appName: string;
  location_button: string;
  placeholder: string;
  welcome_message: string;
  loading: string;
  error: string;
  permissionTitle: string;
  permissionMessage: string;
  app_description: string;
  getting_location: string;
  location_help: string;
}