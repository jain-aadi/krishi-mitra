import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Message, LanguageCode } from '../types';
import { translations } from '../translations';
import { apiService } from '../services/api';
import * as Location from 'expo-location';

interface ChatScreenProps {
  language: LanguageCode;
  location: Location.LocationObjectCoords;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ language, location }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const t = translations[language];

  const handleSendMessage = async () => {
    if (currentMessage.trim() === '' || isLoading) return;

    const userMessage = { id: Date.now(), text: currentMessage, from: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.getRecommendation({
        message: userMessage.text,
        languageCode: language,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      const botMessage = { id: Date.now() + 1, text: response.response, from: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = { id: Date.now() + 1, text: t.error, from: 'bot' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.from === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={item.from === 'user' ? styles.userMessageText : styles.botMessageText}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      {isLoading && <ActivityIndicator style={styles.loading} size="large" color="#2A6A45" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentMessage}
          onChangeText={setCurrentMessage}
          placeholder={t.placeholder}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  messageList: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: '#2A6A45',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessageText: {
    color: '#FFF',
    fontSize: 16,
  },
  botMessageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2A6A45',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});