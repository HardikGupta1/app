import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProfiles } from '../store/profileSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function RootLayoutContent() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadProfiles() as any);
  }, []);
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Profile Manager',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="basic-info" 
        options={{ 
          title: 'Step 1: Basic Info',
        }} 
      />
      <Stack.Screen 
        name="address-info" 
        options={{ 
          title: 'Step 2: Address',
        }} 
      />
      <Stack.Screen 
        name="summary" 
        options={{ 
          title: 'Step 3: Summary',
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootLayoutContent />
      </Provider>
    </GestureHandlerRootView>
  );
}
