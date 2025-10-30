# Multi-Step Profile Form - React Native Assignment

A complete React Native application built with TypeScript and Redux Toolkit for creating, editing, and deleting user profiles through a 3-step form flow.

## 📱 Features

### Core Functionality
- **3-Step Profile Creation Flow**
  - **Page 1**: Basic Info (Full Name, Email, Age)
  - **Page 2**: Address Info (City, State, Country)
  - **Page 3**: Summary & Review
  
- **Profile Management**
  - View all created profiles on Home screen
  - Edit existing profiles
  - Delete profiles with confirmation dialog
  - Add new profiles via FAB (Floating Action Button)

### Technical Implementation
- **React Native** with Expo Router for navigation
- **TypeScript** with proper interfaces for type safety
- **Redux Toolkit** for state management
- **React Navigation** (Stack Navigator)
- **AsyncStorage** for data persistence
- **Form Validation** with real-time error display
- **Loading States** with simulated async operations

## 🏗️ Architecture

### Project Structure
```
frontend/
├── app/
│   ├── _layout.tsx          # Root layout with Redux Provider
│   ├── index.tsx             # Home screen (profile list)
│   ├── basic-info.tsx        # Step 1: Basic information
│   ├── address-info.tsx      # Step 2: Address information
│   └── summary.tsx           # Step 3: Review & submit
├── store/
│   ├── store.ts              # Redux store configuration
│   ├── profileSlice.ts       # Profile state management
│   └── hooks.ts              # Typed Redux hooks
└── utils/
    └── validation.ts         # Form validation functions
```

### Redux State Structure
```typescript
interface ProfileState {
  draftProfile: DraftProfile;      // Current form data (preserves across steps)
  savedProfiles: ProfileData[];    // All saved profiles
  loading: boolean;                // Loading indicator
  editingId: string | null;        // ID when editing existing profile
}

interface ProfileData {
  id: string;
  fullName: string;
  email: string;
  age: string;
  city: string;
  state: string;
  country: string;
}
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, for mobile testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

4. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

5. **Run on different platforms**
   - **Web**: Press `w` in terminal or visit `http://localhost:3000`
   - **iOS**: Press `i` (requires Mac with Xcode)
   - **Android**: Press `a` (requires Android Studio)
   - **Expo Go**: Scan QR code with Expo Go app

## 🎯 Usage Guide

### Creating a New Profile
1. Tap the blue "+" button on home screen
2. **Step 1**: Fill in Full Name, Email, and Age
3. **Step 2**: Fill in City, State/Province, and Country
4. **Step 3**: Review all information
5. Tap "Submit" to save the profile

### Editing a Profile
1. Tap "Edit" button on any profile card
2. Modify the information across the 3 steps
3. Review changes in summary
4. Tap "Submit" to update

### Deleting a Profile
1. Tap "Delete" button on any profile card
2. Confirm deletion in the dialog
3. Profile is removed permanently

## ✅ Validation Rules

- **Full Name**: Required, non-empty string
- **Email**: Required, valid email format (regex validated)
- **Age**: Required, number between 1-150
- **City**: Required, non-empty string
- **State**: Required, non-empty string
- **Country**: Required, non-empty string

## 🔧 Technical Features

### Redux Implementation
- **Redux Toolkit** with createSlice for cleaner code
- **Async Thunks** for simulated async operations
- **Typed hooks** (useAppDispatch, useAppSelector)
- **Draft state** to preserve data across navigation

### TypeScript Usage
- Interfaces for all data structures
- Type-safe Redux hooks
- Proper typing for all components and functions
- Validation function types

### Navigation
- **Expo Router** for file-based routing
- Stack navigation with proper back button support
- Route parameters preservation
- Clean navigation flow

### UI/UX Features
- **Mobile-First Design**: Touch-friendly (48px+ touch targets)
- **Keyboard Handling**: KeyboardAvoidingView for iOS/Android
- **Safe Areas**: Proper insets for notched devices
- **Loading States**: Full-screen overlay during operations
- **Empty States**: Helpful message when no profiles exist
- **Confirmation Dialogs**: Prevent accidental deletions

## 📦 Dependencies

### Core
- `react-native`: Mobile framework
- `expo-router`: File-based navigation
- `@reduxjs/toolkit`: State management
- `react-redux`: Redux React bindings
- `@react-navigation/native-stack`: Stack navigation

### Storage & UI
- `@react-native-async-storage/async-storage`: Data persistence
- `@expo/vector-icons`: Icon library
- `react-native-safe-area-context`: Safe area support
- `react-native-gesture-handler`: Touch gestures

## 🧪 Testing

The application has been tested for:
- ✅ Complete profile creation flow (all 3 steps)
- ✅ Form validation on all fields
- ✅ Navigation (forward/back buttons)
- ✅ Profile editing
- ✅ Profile deletion with confirmation
- ✅ AsyncStorage persistence
- ✅ Loading states
- ✅ Empty state display
- ✅ Mobile responsive design
- ✅ Keyboard handling
- ✅ Safe area insets

## 📱 Platform Compatibility

- **Web**: Full support (Chrome, Safari, Firefox, Edge)
- **iOS**: Native support via Expo Go or builds
- **Android**: Native support via Expo Go or builds

## 💡 Key Implementation Decisions

1. **Redux Toolkit over Classic Redux**
   - Less boilerplate
   - Built-in Immer for immutability
   - Better TypeScript support

2. **Expo Router over React Navigation**
   - File-based routing (simpler)
   - Less configuration needed
   - Better development experience

3. **AsyncStorage over Other Solutions**
   - Simple key-value storage
   - Cross-platform support
   - No external services needed

4. **Simulated Async with setTimeout**
   - Demonstrates loading states
   - Realistic user experience
   - No backend required

## 🔄 Data Flow

```
User Input → Component State → Validation
                ↓
         Redux Action Dispatched
                ↓
         Redux Reducer Updates State
                ↓
         AsyncStorage Persists Data
                ↓
         Component Re-renders
```

## 🎨 Design Choices

- **Color Scheme**: iOS-style blue (#007AFF) for primary actions
- **Typography**: System fonts for native feel
- **Spacing**: 8pt grid system (8px, 16px, 24px, 32px)
- **Shadows**: Subtle elevations for depth
- **Icons**: Ionicons for consistency

## 🚧 Future Enhancements (Optional)

- Search/filter profiles
- Sort by name or age
- Export profiles to JSON/CSV
- Profile categories/tags
- Dark mode support
- Animation transitions
- Pull-to-refresh
- Swipe to delete gesture
- Profile statistics
- Batch operations

## 📄 License

This project is for educational/assignment purposes.

## 👨‍💻 Development Notes

### Assumptions Made
1. No backend API required (Redux + AsyncStorage only)
2. Profile IDs generated using Date.now()
3. All data stored locally on device
4. Simulated network delay (1.5s for save, 800ms for delete)
5. Basic validation rules (can be extended)

### Known Limitations
- Data is device-specific (no cloud sync)
- No user authentication
- Limited to device storage capacity
- No data export/import features

## 📞 Support

For questions or issues, please refer to the assignment guidelines or contact the project maintainer.

---

**Built with ❤️ using React Native, TypeScript, and Redux Toolkit**
