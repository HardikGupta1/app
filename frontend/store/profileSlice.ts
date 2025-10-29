import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileData {
  id: string;
  fullName: string;
  email: string;
  age: string;
  city: string;
  state: string;
  country: string;
  avatar?: string; // base64 image
}

export interface DraftProfile {
  fullName?: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  country?: string;
  avatar?: string;
}

interface ProfileState {
  draftProfile: DraftProfile;
  savedProfiles: ProfileData[];
  loading: boolean;
  editingId: string | null;
}

const initialState: ProfileState = {
  draftProfile: {},
  savedProfiles: [],
  loading: false,
  editingId: null,
};

const STORAGE_KEY = '@profiles_storage';

// Async thunks for persistence
export const loadProfiles = createAsyncThunk(
  'profiles/loadProfiles',
  async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading profiles:', error);
      return [];
    }
  }
);

export const saveProfileAsync = createAsyncThunk(
  'profiles/saveProfileAsync',
  async (profile: ProfileData, { getState }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const state = getState() as { profiles: ProfileState };
    let updatedProfiles: ProfileData[];
    
    if (state.profiles.editingId) {
      // Update existing profile
      updatedProfiles = state.profiles.savedProfiles.map(p => 
        p.id === state.profiles.editingId ? profile : p
      );
    } else {
      // Add new profile
      updatedProfiles = [...state.profiles.savedProfiles, profile];
    }
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfiles));
    return { profile, editingId: state.profiles.editingId };
  }
);

export const deleteProfileAsync = createAsyncThunk(
  'profiles/deleteProfileAsync',
  async (id: string, { getState }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const state = getState() as { profiles: ProfileState };
    const updatedProfiles = state.profiles.savedProfiles.filter(p => p.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfiles));
    return id;
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    updateDraft: (state, action: PayloadAction<Partial<DraftProfile>>) => {
      state.draftProfile = { ...state.draftProfile, ...action.payload };
    },
    clearDraft: (state) => {
      state.draftProfile = {};
      state.editingId = null;
    },
    startEditing: (state, action: PayloadAction<string>) => {
      const profile = state.savedProfiles.find(p => p.id === action.payload);
      if (profile) {
        state.editingId = profile.id;
        state.draftProfile = { ...profile };
      }
    },
    cancelEditing: (state) => {
      state.editingId = null;
      state.draftProfile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfiles.fulfilled, (state, action) => {
        state.savedProfiles = action.payload;
      })
      .addCase(saveProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfileAsync.fulfilled, (state, action) => {
        if (action.payload.editingId) {
          // Update existing
          state.savedProfiles = state.savedProfiles.map(p => 
            p.id === action.payload.editingId ? action.payload.profile : p
          );
        } else {
          // Add new
          state.savedProfiles.push(action.payload.profile);
        }
        state.draftProfile = {};
        state.editingId = null;
        state.loading = false;
      })
      .addCase(saveProfileAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProfileAsync.fulfilled, (state, action) => {
        state.savedProfiles = state.savedProfiles.filter(p => p.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProfileAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateDraft, clearDraft, startEditing, cancelEditing } = profileSlice.actions;
export default profileSlice.reducer;
