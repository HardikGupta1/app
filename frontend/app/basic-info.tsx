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
import { validateBasicInfo } from '../utils/validation';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BasicInfoScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draftProfile = useAppSelector((state) => state.profiles.draftProfile);
  const editingId = useAppSelector((state) => state.profiles.editingId);

  const [fullName, setFullName] = useState(draftProfile.fullName || '');
  const [email, setEmail] = useState(draftProfile.email || '');
  const [age, setAge] = useState(draftProfile.age || '');
  const [errors, setErrors] = useState<any>({});

  const handleNext = () => {
    const validationErrors = validateBasicInfo({ fullName, email, age });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateDraft({ fullName, email, age }));
    router.push('/address-info');
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
          <Text style={styles.title}>
            {editingId ? 'Edit Profile' : 'Create New Profile'}
          </Text>
          <Text style={styles.subtitle}>Step 1 of 3: Basic Information</Text>

          {/* Avatar Picker */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera" size={32} color="#007AFF" />
                  <Text style={styles.avatarText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setErrors({ ...errors, fullName: undefined });
              }}
              autoCapitalize="words"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: undefined });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              placeholder="Enter your age"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setErrors({ ...errors, age: undefined });
              }}
              keyboardType="number-pad"
            />
            {errors.age && (
              <Text style={styles.errorText}>{errors.age}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  avatarText: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
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
    marginTop: 16,
  },
  nextButton: {
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
