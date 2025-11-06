import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Psychology as PsychologyIcon,
  HealthAndSafety as HealthIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'info' | 'warning' | 'success' | 'error';
}

interface AIChatInterfaceProps {
  profileId?: string;
}

const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ profileId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Health Assistant. I can help you understand your medical records, explain health concepts, and provide general health information. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'info',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, selectedProfile } = useSelector((state: RootState) => state.auth);

  const currentProfileId = profileId || selectedProfile?.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'What does my HbA1c level mean?',
    'How can I improve my medication adherence?',
    'Explain the symptoms of diabetes',
    'What are the benefits of regular exercise?',
    'How do I prepare for a blood test?',
    'What foods help lower cholesterol?',
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputText);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse.text,
          sender: 'ai',
          timestamp: new Date(),
          type: aiResponse.type,
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userInput: string): { text: string; type?: 'info' | 'warning' | 'success' | 'error' } => {
    const input = userInput.toLowerCase();

    if (input.includes('hba1c') || input.includes('hemoglobin a1c')) {
      return {
        text: 'HbA1c (Hemoglobin A1c) is a blood test that measures your average blood sugar levels over the past 2-3 months. Normal levels are typically below 5.7%, prediabetes is 5.7-6.4%, and diabetes is 6.5% or higher. Regular monitoring of HbA1c is crucial for diabetes management. Always consult with your healthcare provider for personalized advice about your specific HbA1c results.',
        type: 'info',
      };
    }

    if (input.includes('medication') || input.includes('medicine') || input.includes('adherence')) {
      return {
        text: 'Medication adherence is crucial for managing chronic conditions. Here are some tips: 1) Use pill organizers or smartphone apps, 2) Set daily reminders, 3) Keep medications in visible places, 4) Link doses to daily routines, 5) Refill prescriptions before running out, 6) Track side effects and discuss with your doctor. Remember to never change your medication regimen without consulting your healthcare provider.',
        type: 'success',
      };
    }

    if (input.includes('diabetes') || input.includes('blood sugar')) {
      return {
        text: 'Diabetes is a chronic condition that affects how your body processes blood sugar. Type 1 diabetes is an autoimmune condition where the body doesn\'t produce insulin, while Type 2 diabetes involves insulin resistance. Key management includes: monitoring blood sugar levels, maintaining a healthy diet, regular exercise, medication adherence, and regular check-ups. Early detection and proper management can prevent complications.',
        type: 'info',
      };
    }

    if (input.includes('exercise') || input.includes('physical activity')) {
      return {
        text: 'Regular exercise offers numerous health benefits: improves cardiovascular health, helps maintain healthy weight, strengthens bones and muscles, reduces stress and anxiety, improves sleep quality, boosts immune function, and helps manage chronic conditions like diabetes and hypertension. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus strength training twice weekly.',
        type: 'success',
      };
    }

    if (input.includes('blood test') || input.includes('lab test')) {
      return {
        text: 'Preparing for blood tests: 1) Fast if required (usually 8-12 hours for lipid panels or glucose tests), 2) Drink plenty of water, 3) Avoid alcohol 24 hours before, 4) Inform your doctor about medications, 5) Wear loose clothing, 6) Relax during the procedure. Some tests require no preparation. Always follow your healthcare provider\'s specific instructions. Bring your insurance card and photo ID to the appointment.',
        type: 'info',
      };
    }

    if (input.includes('cholesterol')) {
      return {
        text: 'Cholesterol management involves diet, exercise, and sometimes medication. Foods that help lower cholesterol: oats and barley, fatty fish (omega-3s), nuts, avocados, olive oil, beans and legumes, soy products, and fiber-rich foods. Limit saturated fats, trans fats, and excessive sugar. Regular aerobic exercise can raise HDL (good) cholesterol and lower LDL (bad) cholesterol. Regular monitoring is important for cardiovascular health.',
        type: 'info',
      };
    }

    return {
      text: 'I understand you\'re asking about health-related topics. While I can provide general health information, please remember that I\'m not a substitute for professional medical advice. For specific medical concerns, medication questions, or treatment decisions, always consult with qualified healthcare providers. They can provide personalized advice based on your complete medical history and current health status.',
      type: 'warning',
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <PsychologyIcon />
          <Box>
            <Typography variant="h6" component="h2">
              AI Health Assistant
            </Typography>
            <Typography variant="caption">
              {currentProfileId ? `Profile: ${selectedProfile?.name || 'Active'}` : 'General Health Information'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Messages */}
      <Paper sx={{ flexGrow: 1, mb: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  px: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  {message.sender === 'ai' ? (
                    <BotIcon sx={{ color: 'primary.main' }} />
                  ) : (
                    <PersonIcon sx={{ color: 'secondary.main' }} />
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    maxWidth: '70%',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.text}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            {isLoading && (
              <ListItem sx={{ justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </ListItem>
            )}
          </List>
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Suggested Questions */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Suggested questions:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestedQuestions.map((question, index) => (
            <Chip
              key={index}
              label={question}
              variant="outlined"
              size="small"
              clickable
              onClick={() => handleSuggestedQuestion(question)}
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Box>
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about your health..."
          disabled={isLoading}
          variant="outlined"
          size="small"
        />
        <Tooltip title="Send message">
          <Fab
            color="primary"
            size="small"
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <SendIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Disclaimer */}
      <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Disclaimer:</strong> This AI assistant provides general health information and is not a substitute for professional medical advice. Always consult with qualified healthcare providers for medical decisions and treatment.
        </Typography>
      </Box>
    </Box>
  );
};

export default AIChatInterface;