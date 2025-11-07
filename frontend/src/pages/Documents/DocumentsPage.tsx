import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Container,
  LinearProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Menu,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  PictureAsPdf as PDFIcon,
  Image as ImageIcon,
  Description as DocumentIcon,
  CameraAlt as CameraIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Folder as FolderIcon,
  Tag as TagIcon,
  TextFields as OCRIcon,
  Assignment as ReportIcon,
  LocalHospital as MedicalIcon,
  Science as LabIcon,
  Medication as MedIcon,
  MoreVert as MoreVertIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

interface MedicalDocument {
  id: string;
  profileId: string;
  profileName: string;
  title: string;
  type: 'lab_report' | 'prescription' | 'imaging' | 'insurance' | 'medical_record' | 'vaccination' | 'other';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  documentDate: string;
  doctor: string;
  hospital: string;
  description: string;
  tags: string[];
  ocrProcessed: boolean;
  ocrText: string;
  extractedData: {
    testResults?: Array<{ name: string; value: string; unit: string; range: string; status: 'normal' | 'high' | 'low' }>;
    medications?: Array<{ name: string; dosage: string; frequency: string }>;
    diagnoses?: string[];
    procedures?: string[];
  };
  status: 'processing' | 'completed' | 'failed';
  isFavorite: boolean;
  createdAt: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<MedicalDocument[]>([
    {
      id: '1',
      profileId: '1',
      profileName: 'John Doe',
      title: 'Annual Blood Work Results',
      type: 'lab_report',
      fileUrl: '/api/files/lab_report_001.pdf',
      fileName: 'blood_work_jan2024.pdf',
      fileSize: 2458000,
      fileType: 'application/pdf',
      uploadDate: '2024-01-20',
      documentDate: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'City Medical Center',
      description: 'Complete blood count, metabolic panel, and lipid panel results',
      tags: ['blood work', 'annual', 'cholesterol', 'glucose'],
      ocrProcessed: true,
      ocrText: 'Complete Blood Count (CBC)\nWhite Blood Cell Count: 6.8 K/uL (4.0-11.0)\nRed Blood Cell Count: 4.85 M/uL (4.5-5.9)\nHemoglobin: 15.2 g/dL (13.5-17.5)\nHematocrit: 44.8% (41-53)\n\nMetabolic Panel\nGlucose: 92 mg/dL (70-100)\nBUN: 18 mg/dL (7-20)\nCreatinine: 0.9 mg/dL (0.6-1.2)\n\nLipid Panel\nTotal Cholesterol: 185 mg/dL (<200)\nHDL: 52 mg/dL (>40)\nLDL: 110 mg/dL (<100)\nTriglycerides: 115 mg/dL (<150)',
      extractedData: {
        testResults: [
          { name: 'Glucose', value: '92', unit: 'mg/dL', range: '70-100', status: 'normal' },
          { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '<200', status: 'normal' },
          { name: 'LDL', value: '110', unit: 'mg/dL', range: '<100', status: 'high' },
          { name: 'HDL', value: '52', unit: 'mg/dL', range: '>40', status: 'normal' },
        ],
      },
      status: 'completed',
      isFavorite: true,
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      profileId: '2',
      profileName: 'Sarah Doe',
      title: 'Diabetes Management Plan',
      type: 'prescription',
      fileUrl: '/api/files/prescription_001.pdf',
      fileName: 'diabetes_plan_feb2024.pdf',
      fileSize: 1250000,
      fileType: 'application/pdf',
      uploadDate: '2024-02-28',
      documentDate: '2024-02-28',
      doctor: 'Dr. Michael Chen',
      hospital: 'Specialty Care Hospital',
      description: 'Updated diabetes management plan with medication adjustments',
      tags: ['diabetes', 'medication', 'treatment plan'],
      ocrProcessed: true,
      ocrText: 'Diabetes Management Plan\nPatient: Sarah Doe\nDate: February 28, 2024\n\nMedications:\n1. Metformin 500mg - Take 1 tablet twice daily with meals\n2. Insulin Glargine - 10 units subcutaneously at bedtime\n\nDietary Recommendations:\n- Low carbohydrate diet\n- Regular meal times\n- Monitor blood glucose before meals and at bedtime\n\nFollow-up in 3 months',
      extractedData: {
        medications: [
          { name: 'Metformin', dosage: '500mg', frequency: 'twice daily with meals' },
          { name: 'Insulin Glargine', dosage: '10 units', frequency: 'at bedtime' },
        ],
        diagnoses: ['Type 2 Diabetes'],
      },
      status: 'completed',
      isFavorite: false,
      createdAt: '2024-02-28T14:20:00Z'
    },
    {
      id: '3',
      profileId: '1',
      profileName: 'John Doe',
      title: 'Chest X-Ray Report',
      type: 'imaging',
      fileUrl: '/api/files/xray_001.jpg',
      fileName: 'chest_xray_jan2024.jpg',
      fileSize: 3200000,
      fileType: 'image/jpeg',
      uploadDate: '2024-03-05',
      documentDate: '2024-03-03',
      doctor: 'Dr. Robert Lee',
      hospital: 'City Medical Center',
      description: 'Chest X-ray for routine screening',
      tags: ['x-ray', 'chest', 'imaging', 'screening'],
      ocrProcessed: true,
      ocrText: 'Chest X-Ray Report\nDate: March 3, 2024\nPatient: John Doe\n\nFindings: Clear lungs bilaterally. No evidence of pneumonia, pleural effusion, or pneumothorax. Heart size and pulmonary vascularity are normal. No acute cardiopulmonary abnormalities.\n\nImpression: Normal chest X-ray.',
      extractedData: {
        diagnoses: ['Normal chest X-ray'],
      },
      status: 'completed',
      isFavorite: false,
      createdAt: '2024-03-05T09:15:00Z'
    },
    {
      id: '4',
      profileId: '1',
      profileName: 'John Doe',
      title: 'Insurance Coverage Summary',
      type: 'insurance',
      fileUrl: '/api/files/insurance_001.pdf',
      fileName: 'insurance_coverage_2024.pdf',
      fileSize: 890000,
      fileType: 'application/pdf',
      uploadDate: '2024-03-10',
      documentDate: '2024-01-01',
      doctor: '',
      hospital: 'BlueCross BlueShield',
      description: '2024 health insurance coverage details and benefits',
      tags: ['insurance', 'coverage', 'benefits'],
      ocrProcessed: false,
      ocrText: '',
      extractedData: {},
      status: 'processing',
      isFavorite: false,
      createdAt: '2024-03-10T11:45:00Z'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingDocument, setEditingDocument] = useState<MedicalDocument | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProfile, setFilterProfile] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<MedicalDocument | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState<Partial<MedicalDocument>>({
    profileId: '',
    profileName: '',
    title: '',
    type: 'medical_record',
    documentDate: '',
    doctor: '',
    hospital: '',
    description: '',
    tags: [],
  });

  const documentTypes = [
    { value: 'lab_report', label: 'Lab Report', icon: <LabIcon /> },
    { value: 'prescription', label: 'Prescription', icon: <MedIcon /> },
    { value: 'imaging', label: 'Imaging', icon: <CameraIcon /> },
    { value: 'insurance', label: 'Insurance', icon: <DocumentIcon /> },
    { value: 'medical_record', label: 'Medical Record', icon: <MedicalIcon /> },
    { value: 'vaccination', label: 'Vaccination', icon: <ReportIcon /> },
    { value: 'other', label: 'Other', icon: <DocumentIcon /> },
  ];

  const profiles = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Doe' },
  ];

  const handleOpenDialog = (document?: MedicalDocument) => {
    if (document) {
      setEditingDocument(document);
      setFormData(document);
    } else {
      setEditingDocument(null);
      setFormData({
        profileId: '',
        profileName: '',
        title: '',
        type: 'medical_record',
        documentDate: '',
        doctor: '',
        hospital: '',
        description: '',
        tags: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDocument(null);
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData({
        ...formData,
        title: formData.title || file.name.replace(/\.[^/.]+$/, ''),
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const newDocument: MedicalDocument = {
        ...formData as MedicalDocument,
        id: Date.now().toString(),
        fileUrl: `/api/files/${selectedFile.name}`,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        uploadDate: new Date().toISOString().split('T')[0],
        ocrProcessed: false,
        ocrText: '',
        extractedData: {},
        status: 'processing',
        isFavorite: false,
        createdAt: new Date().toISOString(),
      };

      setDocuments([...documents, newDocument]);
      setIsUploading(false);

      // Simulate OCR processing
      setTimeout(() => {
        setDocuments(prev => prev.map(doc =>
          doc.id === newDocument.id
            ? {
                ...doc,
                status: 'completed',
                ocrProcessed: true,
                ocrText: 'Sample OCR text extracted from document...',
              }
            : doc
        ));
      }, 3000);

      handleCloseDialog();
    }, 2000);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    ));
  };

  const handleProfileChange = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    setFormData({
      ...formData,
      profileId,
      profileName: profile?.name || ''
    });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, document: MedicalDocument) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDocument(null);
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = documentTypes.find(t => t.value === type);
    return typeConfig?.icon || <DocumentIcon />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesProfile = filterProfile === 'all' || doc.profileId === filterProfile;
    return matchesSearch && matchesType && matchesProfile;
  });

  const favoriteDocuments = filteredDocuments.filter(doc => doc.isFavorite);
  const otherDocuments = filteredDocuments.filter(doc => !doc.isFavorite);

  return (
    <>
      <Helmet>
        <title>Medical Documents - Personal Health Manager</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Medical Documents
          </Typography>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Upload Document
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Upload and organize medical documents with automatic OCR processing.
            Extract test results, medications, and important medical information from your files.
          </Typography>
        </Alert>

        {/* Search and Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Document Type"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {documentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Profile</InputLabel>
                <Select
                  value={filterProfile}
                  onChange={(e) => setFilterProfile(e.target.value)}
                  label="Profile"
                >
                  <MenuItem value="all">All Profiles</MenuItem>
                  {profiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterProfile('all');
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Favorites Section */}
        {favoriteDocuments.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TagIcon color="warning" />
              Favorite Documents
            </Typography>
            <Grid container spacing={3}>
              {favoriteDocuments.map((doc) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease-in-out',
                      border: 2,
                      borderColor: 'warning.main',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        {getTypeIcon(doc.type)}
                        <Chip
                          label={doc.ocrProcessed ? 'OCR Processed' : 'Processing'}
                          color={doc.ocrProcessed ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="h6" component="h2" sx={{ mb: 1, fontSize: '1rem' }}>
                        {doc.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: '0.75rem' }}>
                          {doc.profileName.charAt(0)}
                        </Avatar>
                        {doc.profileName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {doc.fileName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(doc.fileSize)} • {doc.uploadDate}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ pt: 0 }}>
                      <IconButton size="small" color="primary">
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleMenuClick(event as any, doc)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* All Documents */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FolderIcon color="primary" />
            All Documents ({filteredDocuments.length})
          </Typography>
          <Grid container spacing={3}>
            {filteredDocuments.map((doc) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease-in-out',
                    opacity: doc.status === 'processing' ? 0.8 : 1,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      {getTypeIcon(doc.type)}
                      <Chip
                        label={doc.ocrProcessed ? 'OCR Processed' : 'Processing'}
                        color={doc.ocrProcessed ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ mb: 1, fontSize: '1rem' }}>
                      {doc.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      <Avatar sx={{ width: 20, height: 20, mr: 1, fontSize: '0.75rem' }}>
                        {doc.profileName.charAt(0)}
                      </Avatar>
                      {doc.profileName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {doc.fileName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(doc.fileSize)} • {doc.uploadDate}
                    </Typography>

                    {doc.tags.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {doc.tags.slice(0, 2).map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.6rem', height: 20 }}
                          />
                        ))}
                        {doc.tags.length > 2 && (
                          <Chip
                            label={`+${doc.tags.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.6rem', height: 20 }}
                          />
                        )}
                      </Box>
                    )}

                    {doc.status === 'processing' && (
                      <Box sx={{ mt: 1 }}>
                        <LinearProgress />
                        <Typography variant="caption" color="text.secondary">
                          Processing OCR...
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ pt: 0 }}>
                    <IconButton size="small" color="primary">
                      <ViewIcon />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color={doc.isFavorite ? 'warning' : 'default'}
                      onClick={() => handleToggleFavorite(doc.id)}
                    >
                      <TagIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMenuClick(event as any, doc)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: { minWidth: 200 }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ViewIcon sx={{ mr: 1 }} />
            View Document
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <DownloadIcon sx={{ mr: 1 }} />
            Download
          </MenuItem>
          <MenuItem onClick={() => {
            if (selectedDocument) {
              handleOpenDialog(selectedDocument);
            }
            handleMenuClose();
          }}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Details
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              if (selectedDocument) {
                handleToggleFavorite(selectedDocument.id);
              }
              handleMenuClose();
            }}
          >
            <TagIcon sx={{ mr: 1 }} />
            {selectedDocument?.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedDocument) {
                handleDeleteDocument(selectedDocument.id);
              }
              handleMenuClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Document
          </MenuItem>
        </Menu>

        {/* Upload Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingDocument ? 'Edit Document' : 'Upload New Document'}
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              {!editingDocument && (
                <Box sx={{ mb: 3 }}>
                  <input
                    accept="application/pdf,image/*,.doc,.docx"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      sx={{ p: 3, border: '2px dashed', borderColor: 'primary.main' }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h6" gutterBottom>
                          Choose File or Drop Here
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          PDF, Images, Word documents (Max 10MB)
                        </Typography>
                        {selectedFile && (
                          <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              Selected: {selectedFile.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatFileSize(selectedFile.size)}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Button>
                  </label>
                  {isUploading && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={uploadProgress} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Uploading... {uploadProgress}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Profile</InputLabel>
                    <Select
                      value={formData.profileId || ''}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      label="Profile"
                    >
                      {profiles.map((profile) => (
                        <MenuItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      label="Document Type"
                    >
                      {documentTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Document Date"
                    type="date"
                    value={formData.documentDate || ''}
                    onChange={(e) => setFormData({ ...formData, documentDate: e.target.value })}
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor/Hospital"
                    value={formData.doctor || formData.hospital || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      doctor: e.target.value,
                      hospital: e.target.value
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleUpload}
              variant="contained"
              disabled={!selectedFile && !editingDocument || !formData.profileId}
            >
              {editingDocument ? 'Update' : 'Upload'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="upload document"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <UploadIcon />
        </Fab>
      </Container>
    </>
  );
};

export default DocumentsPage;
