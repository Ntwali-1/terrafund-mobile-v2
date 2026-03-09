import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
type AvailabilityType = 'LEASE' | 'SALE' | 'BOTH';

export default function RegisterLandScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Step 1: Land Details
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [sector, setSector] = useState('');
  const [areaSqMeters, setAreaSqMeters] = useState('');
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType | null>(null);

  // Step 2: Images
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  // Step 3: Documents
  const [documentUrls, setDocumentUrls] = useState<string[]>(['']);

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const steps = ['Land Details', 'Images', 'Documents'];

  const validateStep1 = () => {
    if (!province || province.length < 2 || province.length > 50) {
      Alert.alert('Validation Error', 'Province must be between 2 and 50 characters');
      return false;
    }
    if (!district || district.length < 2 || district.length > 50) {
      Alert.alert('Validation Error', 'District must be between 2 and 50 characters');
      return false;
    }
    if (!sector || sector.length < 2 || sector.length > 50) {
      Alert.alert('Validation Error', 'Sector must be between 2 and 50 characters');
      return false;
    }
    const area = parseFloat(areaSqMeters);
    if (!areaSqMeters || isNaN(area) || area < 100 || area > 10000000) {
      Alert.alert('Validation Error', 'Area must be between 100 and 10,000,000 square meters');
      return false;
    }
    if (!availabilityType) {
      Alert.alert('Validation Error', 'Please select an availability type');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const validUrls = imageUrls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) {
      Alert.alert('Validation Error', 'At least one image URL is required');
      return false;
    }
    if (validUrls.length > 10) {
      Alert.alert('Validation Error', 'Cannot upload more than 10 images');
      return false;
    }
    // Basic URL validation
    const urlPattern = /^https?:\/\/.+/;
    for (const url of validUrls) {
      if (!urlPattern.test(url)) {
        Alert.alert('Validation Error', `Invalid URL format: ${url}`);
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    const validUrls = documentUrls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) {
      Alert.alert('Validation Error', 'At least one document URL is required');
      return false;
    }
    if (validUrls.length > 5) {
      Alert.alert('Validation Error', 'Cannot upload more than 5 documents');
      return false;
    }
    const urlPattern = /^https?:\/\/.+/;
    for (const url of validUrls) {
      if (!urlPattern.test(url)) {
        Alert.alert('Validation Error', `Invalid URL format: ${url}`);
        return false;
      }
    }
    return true;
  };

  const goToNextStep = () => {
    if (currentStep === 0 && !validateStep1()) return;
    if (currentStep === 1 && !validateStep2()) return;
    
    if (currentStep < 2) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({ x: width * nextStep, animated: true });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({ x: width * prevStep, animated: true });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setLoading(true);
    
    const landData = {
      province,
      district,
      sector,
      areaSqMeters: parseFloat(areaSqMeters),
      availabilityType,
      imageUrls: imageUrls.filter(url => url.trim() !== ''),
      documentUrls: documentUrls.filter(url => url.trim() !== ''),
    };

    console.log('Submitting land data:', landData);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Your land has been registered successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1500);
  };

  const addImageUrl = () => {
    if (imageUrls.length < 10) {
      setImageUrls([...imageUrls, '']);
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addDocumentUrl = () => {
    if (documentUrls.length < 5) {
      setDocumentUrls([...documentUrls, '']);
    }
  };

  const removeDocumentUrl = (index: number) => {
    setDocumentUrls(documentUrls.filter((_, i) => i !== index));
  };

  const updateDocumentUrl = (index: number, value: string) => {
    const newUrls = [...documentUrls];
    newUrls[index] = value;
    setDocumentUrls(newUrls);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a', '#0f1f0f'] : ['#f8fafc', '#ffffff', '#f0fdf4']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.decorativeBackground}>
        <View style={[styles.decorativeCircle, styles.circle1, {
          backgroundColor: isDark ? 'rgba(17, 212, 33, 0.08)' : 'rgba(17, 212, 33, 0.06)'
        }]} />
        <View style={[styles.decorativeCircle, styles.circle2, {
          backgroundColor: isDark ? 'rgba(17, 212, 33, 0.05)' : 'rgba(17, 212, 33, 0.04)'
        }]} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Register New Land</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={[
                styles.stepCircle,
                {
                  backgroundColor: index <= currentStep ? '#11d421' : (isDark ? '#333' : '#e5e7eb'),
                  borderColor: index === currentStep ? '#11d421' : 'transparent',
                }
              ]}>
                {index < currentStep ? (
                  <MaterialIcons name="check" size={16} color="#ffffff" />
                ) : (
                  <Text style={[styles.stepNumber, { color: index <= currentStep ? '#ffffff' : (isDark ? '#666' : '#9ca3af') }]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={[styles.stepLabel, { color: index === currentStep ? theme.text : theme.textSecondary }]}>
                {step}
              </Text>
              {index < steps.length - 1 && (
                <View style={[styles.stepLine, { backgroundColor: index < currentStep ? '#11d421' : (isDark ? '#333' : '#e5e7eb') }]} />
              )}
            </View>
          ))}
        </View>

        {/* Carousel */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Step 1: Land Details */}
          <ScrollView
            style={{ width }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.stepContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.infoCard, {
              backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
              borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.15)'
            }]}>
              <MaterialIcons name="info-outline" size={20} color="#11d421" />
              <Text style={[styles.infoText, { color: isDark ? '#d1d5db' : '#374151' }]}>
                Provide the location and size details of your land
              </Text>
            </View>

            <View style={[styles.formCard, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="location-on" size={20} color="#11d421" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Location Details</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'province' ? theme.tint : theme.textSecondary }]}>
                  Province
                </Text>
                <TextInput
                  style={[styles.input, {
                    color: theme.text,
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                    borderColor: focusedInput === 'province' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  }]}
                  placeholder="e.g., Kigali"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                  value={province}
                  onChangeText={setProvince}
                  onFocus={() => setFocusedInput('province')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'district' ? theme.tint : theme.textSecondary }]}>
                  District
                </Text>
                <TextInput
                  style={[styles.input, {
                    color: theme.text,
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                    borderColor: focusedInput === 'district' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  }]}
                  placeholder="e.g., Gasabo"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                  value={district}
                  onChangeText={setDistrict}
                  onFocus={() => setFocusedInput('district')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'sector' ? theme.tint : theme.textSecondary }]}>
                  Sector
                </Text>
                <TextInput
                  style={[styles.input, {
                    color: theme.text,
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                    borderColor: focusedInput === 'sector' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  }]}
                  placeholder="e.g., Remera"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                  value={sector}
                  onChangeText={setSector}
                  onFocus={() => setFocusedInput('sector')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                <MaterialIcons name="terrain" size={20} color="#11d421" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Land Details</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'area' ? theme.tint : theme.textSecondary }]}>
                  Area (Square Meters)
                </Text>
                <TextInput
                  style={[styles.input, {
                    color: theme.text,
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                    borderColor: focusedInput === 'area' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  }]}
                  placeholder="Min: 100, Max: 10,000,000"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                  value={areaSqMeters}
                  onChangeText={setAreaSqMeters}
                  onFocus={() => setFocusedInput('area')}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="numeric"
                />
                {areaSqMeters && !isNaN(parseFloat(areaSqMeters)) && (
                  <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                    ≈ {(parseFloat(areaSqMeters) / 10000).toFixed(2)} hectares
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>
                  Availability Type
                </Text>
                <View style={styles.availabilityOptions}>
                  {(['LEASE', 'SALE', 'BOTH'] as AvailabilityType[]).map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setAvailabilityType(type)}
                      style={[styles.availabilityOption, {
                        backgroundColor: availabilityType === type ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff'),
                        borderColor: availabilityType === type ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                      }]}
                    >
                      <MaterialIcons
                        name={availabilityType === type ? 'check-circle' : 'radio-button-unchecked'}
                        size={20}
                        color={availabilityType === type ? '#ffffff' : theme.textSecondary}
                      />
                      <Text style={[styles.availabilityText, { color: availabilityType === type ? '#ffffff' : theme.text }]}>
                        {type === 'LEASE' ? 'For Lease' : type === 'SALE' ? 'For Sale' : 'Both'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Step 2: Images */}
          <ScrollView
            style={{ width }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.stepContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.infoCard, {
              backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
              borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.15)'
            }]}>
              <MaterialIcons name="info-outline" size={20} color="#11d421" />
              <Text style={[styles.infoText, { color: isDark ? '#d1d5db' : '#374151' }]}>
                Add 1-10 image URLs of your land. High-quality images attract more investors.
              </Text>
            </View>

            <View style={[styles.formCard, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="image" size={20} color="#11d421" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Land Images</Text>
              </View>

              {imageUrls.map((url, index) => (
                <View key={index} style={styles.urlInputGroup}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>
                      Image URL {index + 1}
                    </Text>
                    <TextInput
                      style={[styles.input, {
                        color: theme.text,
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }]}
                      placeholder="https://example.com/image.jpg"
                      placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                      value={url}
                      onChangeText={(text) => updateImageUrl(index, text)}
                      autoCapitalize="none"
                    />
                  </View>
                  {imageUrls.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeImageUrl(index)}
                      style={[styles.removeButton, { backgroundColor: isDark ? '#2a2a2a' : '#fee2e2' }]}
                    >
                      <MaterialIcons name="close" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {imageUrls.length < 10 && (
                <TouchableOpacity
                  onPress={addImageUrl}
                  style={[styles.addButton, {
                    backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
                    borderColor: '#11d421'
                  }]}
                >
                  <MaterialIcons name="add-circle-outline" size={20} color="#11d421" />
                  <Text style={[styles.addButtonText, { color: '#11d421' }]}>
                    Add Another Image
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          {/* Step 3: Documents */}
          <ScrollView
            style={{ width }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.stepContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.infoCard, {
              backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
              borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.15)'
            }]}>
              <MaterialIcons name="info-outline" size={20} color="#11d421" />
              <Text style={[styles.infoText, { color: isDark ? '#d1d5db' : '#374151' }]}>
                Add 1-5 document URLs (land titles, certificates, etc.) to verify ownership.
              </Text>
            </View>

            <View style={[styles.formCard, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="description" size={20} color="#11d421" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Land Documents</Text>
              </View>

              {documentUrls.map((url, index) => (
                <View key={index} style={styles.urlInputGroup}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>
                      Document URL {index + 1}
                    </Text>
                    <TextInput
                      style={[styles.input, {
                        color: theme.text,
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }]}
                      placeholder="https://example.com/document.pdf"
                      placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                      value={url}
                      onChangeText={(text) => updateDocumentUrl(index, text)}
                      autoCapitalize="none"
                    />
                  </View>
                  {documentUrls.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeDocumentUrl(index)}
                      style={[styles.removeButton, { backgroundColor: isDark ? '#2a2a2a' : '#fee2e2' }]}
                    >
                      <MaterialIcons name="close" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {documentUrls.length < 5 && (
                <TouchableOpacity
                  onPress={addDocumentUrl}
                  style={[styles.addButton, {
                    backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
                    borderColor: '#11d421'
                  }]}
                >
                  <MaterialIcons name="add-circle-outline" size={20} color="#11d421" />
                  <Text style={[styles.addButtonText, { color: '#11d421' }]}>
                    Add Another Document
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={[styles.navigationContainer, {
          backgroundColor: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        }]}>
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={goToPreviousStep}
              style={[styles.navButton, styles.backNavButton, {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}
            >
              <MaterialIcons name="arrow-back" size={20} color={theme.text} />
              <Text style={[styles.navButtonText, { color: theme.text }]}>Back</Text>
            </TouchableOpacity>
          )}

          {currentStep < 2 ? (
            <TouchableOpacity
              onPress={goToNextStep}
              style={[styles.navButton, styles.nextNavButton, { marginLeft: currentStep === 0 ? 'auto' : 0 }]}
            >
              <LinearGradient
                colors={['#11d421', '#0fb31c']}
                style={styles.navGradient}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={[styles.navButton, styles.nextNavButton]}
            >
              <LinearGradient
                colors={['#11d421', '#0fb31c']}
                style={styles.navGradient}
              >
                {loading ? (
                  <Text style={styles.nextButtonText}>SUBMITTING...</Text>
                ) : (
                  <>
                    <Text style={styles.nextButtonText}>Submit</Text>
                    <MaterialIcons name="check-circle" size={20} color="#ffffff" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: 50,
    left: -80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
  },
  stepContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 20,
  },
  formCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  helperText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    marginTop: 6,
    marginLeft: 4,
  },
  availabilityOptions: {
    gap: 12,
  },
  availabilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  availabilityText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  urlInputGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  removeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 24,
    gap: 12,
    borderTopWidth: 1,
  },
  navButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  backNavButton: {
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  nextNavButton: {
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  navGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});
