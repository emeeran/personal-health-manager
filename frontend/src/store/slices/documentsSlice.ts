import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  profile_id: string;
  file_name: string;
  file_type: string;
  document_type?: string;
  title?: string;
  ocr_status: string;
  uploaded_at: string;
  is_verified: boolean;
}

interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  documents: [],
  selectedDocument: null,
  loading: false,
  uploading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.unshift(action.payload);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
      if (state.selectedDocument?.id === action.payload.id) {
        state.selectedDocument = action.payload;
      }
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((d) => d.id !== action.payload);
      if (state.selectedDocument?.id === action.payload) {
        state.selectedDocument = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDocuments,
  setSelectedDocument,
  addDocument,
  updateDocument,
  removeDocument,
  setLoading,
  setUploading,
  setError,
} = documentsSlice.actions;

export default documentsSlice.reducer;
