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
  Button,
  Divider,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Psychology as PsychologyIcon,
  HealthAndSafety as HealthIcon,
  Science as ScienceIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../store';

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
  const { user, selectedProfile } = useAppSelector((state) => state.auth);

  const currentProfileId = profileId || selectedProfile?.id;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mx: 2,
            mt: 1,
            borderRadius: 1,
          }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Messages Container - Scrollable Area */}
      <Box
        ref={messagesEndRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 2,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '3px',
            '&:hover': {
              background: '#a8a8a8',
            },
          },
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                minWidth: '120px',
              }}
            >
              {/* Simple Message Bubble */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  background: message.sender === 'user'
                    ? '#3b82f6'
                    : '#f3f4f6',
                  color: message.sender === 'user' ? '#ffffff' : '#1f2937',
                  wordBreak: 'break-word',
                }}
              >
                {message.sender === 'ai' ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                          {children}
                        </Typography>
                      ),
                      ul: ({ children }) => (
                        <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                          {children}
                        </Box>
                      ),
                      ol: ({ children }) => (
                        <Box component="ol" sx={{ pl: 2, mb: 1 }}>
                          {children}
                        </Box>
                      ),
                      li: ({ children }) => (
                        <Typography variant="body2" component="li" sx={{ lineHeight: 1.5 }}>
                          {children}
                        </Typography>
                      ),
                      strong: ({ children }) => (
                        <Typography component="span" sx={{ fontWeight: 600 }}>
                          {children}
                        </Typography>
                      ),
                      em: ({ children }) => (
                        <Typography component="span" sx={{ fontStyle: 'italic' }}>
                          {children}
                        </Typography>
                      ),
                      code: ({ inline, children }) => (
                        <Typography
                          component="span"
                          sx={{
                            fontFamily: 'monospace',
                            bgcolor: 'rgba(0,0,0,0.1)',
                            px: 0.5,
                            py: 0.25,
                            borderRadius: 0.25,
                            fontSize: '0.85rem',
                          }}
                        >
                          {children}
                        </Typography>
                      ),
                      h1: ({ children }) => (
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 1 }}>
                          {children}
                        </Typography>
                      ),
                      h2: ({ children }) => (
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 1 }}>
                          {children}
                        </Typography>
                      ),
                      h3: ({ children }) => (
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, mt: 1 }}>
                          {children}
                        </Typography>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.5,
                    }}
                  >
                    {message.text}
                  </Typography>
                )}
              </Box>

              {/* Simple Timestamp */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                  fontSize: '0.7rem',
                }}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Minimal Typing Indicator */}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                px: 3,
                py: 2,
                borderRadius: 2,
                background: '#f3f4f6',
                color: '#6b7280',
              }}
            >
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                AI is thinking...
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Clean Input Area - Pinned at Bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #f3f4f6',
          bgcolor: '#ffffff',
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#f9fafb',
                '&:hover': {
                  bgcolor: '#ffffff',
                },
                '&.Mui-focused': {
                  bgcolor: '#ffffff',
                  borderColor: '#3b82f6',
                },
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            sx={{
              bgcolor: '#3b82f6',
              color: 'white',
              '&:hover': {
                bgcolor: '#2563eb',
              },
              '&:disabled': {
                bgcolor: '#e5e7eb',
                color: '#9ca3af',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AIChatInterface;