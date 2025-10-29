import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDraft } from '../store/profileSlice';
import { validateAddressInfo } from '../utils/validation';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressInfoScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draftProfile = useAppSelector((state) => state.profiles.draftProfile);

  const [city, setCity] = useState(draftProfile.city || '');
  const [state, setState] = useState(draftProfile.state || '');
  const [country, setCountry] = useState(draftProfile.country || '');
  const [errors, setErrors] = useState<any>({});

  const handleBack = () => {
    dispatch(updateDraft({ city, state, country }));
    router.back();
  };

  const handleNext = () => {
    const validationErrors = validateAddressInfo({ city, state, country });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateDraft({ city, state, country }));
    router.push('/summary');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Address Information</Text>
          <Text style={styles.subtitle}>Step 2 of 3: Where do you live?</Text>

          {/* City */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="Enter your city"
              value={city}
              onChangeText={(text) => {
                setCity(text);
                setErrors({ ...errors, city: undefined });
              }}
              autoCapitalize="words"
            />
            {errors.city && (
              <Text style={styles.errorText}>{errors.city}</Text>
            )}
          </View>

          {/* State */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>State/Province *</Text>
            <TextInput
              style={[styles.input, errors.state && styles.inputError]}
              placeholder="Enter your state or province"
              value={state}
              onChangeText={(text) => {
                setState(text);
                setErrors({ ...errors, state: undefined });
              }}
              autoCapitalize="words"
            />
            {errors.state && (
              <Text style={styles.errorText}>{errors.state}</Text>
            )}
          </View>

          {/* Country */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country *</Text>
            <TextInput
              style={[styles.input, errors.country && styles.inputError]}
              placeholder="Enter your country"
              value={country}
              onChangeText={(text) => {
                setCountry(text);
                setErrors({ ...errors, country: undefined });
              }}
              autoCapitalize="words"
            />
            {errors.country && (
              <Text style={styles.errorText}>{errors.country}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color="#007AFF" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
