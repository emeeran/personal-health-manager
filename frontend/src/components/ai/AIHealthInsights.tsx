import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Lightbulb as TipIcon,
  TrendingUp as TrendingIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Timeline as TimelineIcon,
  Favorite as HeartIcon,
  MedicalServices as MedicalIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  FitnessCenter as FitnessIcon,
  Restaurant as NutritionIcon,
  Bedtime as SleepIcon,
} from '@mui/icons-material';

interface AIHealthInsightsProps {
  profileId?: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'success' | 'trend';
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
  category: 'medication' | 'lifestyle' | 'monitoring' | 'general';
}

const AIHealthInsights: React.FC<AIHealthInsightsProps> = ({ profileId }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading insights
    setTimeout(() => {
      const generatedInsights: Insight[] = [
        {
          id: '1',
          title: 'HbA1c Trend Improving',
          description: 'Your HbA1c levels have shown a consistent downward trend over the past 6 months. Keep up the good work with your current management plan.',
          type: 'success',
          icon: <TrendingIcon />,
          priority: 'high',
          category: 'monitoring',
        },
        {
          id: '2',
          title: 'Medication Adherence Tip',
          description: 'Consider setting up daily reminders for your medications. Consistent timing helps maintain stable blood sugar levels.',
          type: 'tip',
          icon: <MedicalIcon />,
          priority: 'medium',
          category: 'medication',
        },
        {
          id: '3',
          title: 'Exercise Recommendation',
          description: 'Based on your profile, adding 30 minutes of moderate exercise 5 days a week could significantly improve your cardiovascular health.',
          type: 'tip',
          icon: <FitnessIcon />,
          priority: 'medium',
          category: 'lifestyle',
        },
        {
          id: '4',
          title: 'Nutrition Focus',
          description: 'Increasing fiber intake and reducing processed carbohydrates may help with blood sugar management.',
          type: 'tip',
          icon: <NutritionIcon />,
          priority: 'medium',
          category: 'lifestyle',
        },
        {
          id: '5',
          title: 'Regular Monitoring',
          description: 'Your recent blood sugar readings show good patterns. Continue monitoring at the same times daily for consistency.',
          type: 'success',
          icon: <TimelineIcon />,
          priority: 'low',
          category: 'monitoring',
        },
        {
          id: '6',
          title: 'Sleep Impact',
          description: 'Quality sleep is crucial for hormone regulation and blood sugar control. Aim for 7-9 hours per night.',
          type: 'tip',
          icon: <SleepIcon />,
          priority: 'low',
          category: 'lifestyle',
        },
        {
          id: '7',
          title: 'Upcoming Check-up',
          description: 'Schedule your quarterly check-up soon to review your progress with your healthcare provider.',
          type: 'warning',
          icon: <WarningIcon />,
          priority: 'high',
          category: 'general',
        },
      ];

      setInsights(generatedInsights);
      setLoading(false);
    }, 1000);
  }, [profileId]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medication':
        return <MedicalIcon sx={{ color: 'primary.main' }} />;
      case 'lifestyle':
        return <HeartIcon sx={{ color: 'secondary.main' }} />;
      case 'monitoring':
        return <TimelineIcon sx={{ color: 'info.main' }} />;
      default:
        return <PsychologyIcon sx={{ color: 'warning.main' }} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getHealthScore = () => {
    // Simulate health score calculation
    return 85;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Generating health insights...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
        <ScienceIcon />
        AI Health Insights
      </Typography>

      {/* Health Score Overview */}
      <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body1" fontWeight="medium">
              Overall Health Score
            </Typography>
            <Typography variant="h4" color={getScoreColor(getHealthScore()) + '.main'}>
              {getHealthScore()}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={getHealthScore()}
            color={getScoreColor(getHealthScore()) as any}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Based on your recent health metrics and adherence patterns
          </Typography>
        </CardContent>
      </Card>

      {/* Priority Insights */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Priority Items
        </Typography>
        <List dense>
          {insights
            .filter(insight => insight.priority === 'high')
            .slice(0, 2)
            .map((insight) => (
              <ListItem key={insight.id} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {insight.icon}
                </ListItemIcon>
                <ListItemText
                  primary={insight.title}
                  secondary={insight.description}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Chip
                  label={insight.type}
                  size="small"
                  color={getTypeColor(insight.type) as any}
                  variant="outlined"
                />
              </ListItem>
            ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Category Breakdown */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Health Areas
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['medication', 'lifestyle', 'monitoring'].map((category) => {
            const categoryInsights = insights.filter(i => i.category === category);
            const categoryScore = Math.floor(Math.random() * 30) + 70; // Simulated score
            return (
              <Card key={category} variant="outlined" sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  {getCategoryIcon(category)}
                  <Typography variant="body2" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                    {category} Management
                  </Typography>
                  <Chip
                    label={`${categoryScore}%`}
                    size="small"
                    color={categoryScore >= 80 ? 'success' : categoryScore >= 60 ? 'warning' : 'error'}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={categoryScore}
                  color={categoryScore >= 80 ? 'success' : categoryScore >= 60 ? 'warning' : 'error'}
                  sx={{ height: 4, borderRadius: 2 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {categoryInsights.length} recommendations available
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Quick Tips */}
      <Box>
        <Typography variant="subtitle2" gutterBottom display="flex" alignItems="center" gap={1}>
          <TipIcon />
          Quick Health Tips
        </Typography>
        <List dense>
          {insights
            .filter(insight => insight.type === 'tip' && insight.priority === 'medium')
            .slice(0, 3)
            .map((insight) => (
              <ListItem key={insight.id} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <TipIcon color="action" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={insight.title}
                  secondary={insight.description}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
        </List>
      </Box>

      {/* Disclaimer */}
      <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Note:</strong> These insights are based on your health data patterns and general medical guidelines. Always consult with your healthcare provider for personalized medical advice.
        </Typography>
      </Box>
    </Paper>
  );
};

export default AIHealthInsights;