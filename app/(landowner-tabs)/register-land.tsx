import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import {
    ActivityIndicator,
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
    Image,
    Alert,
    Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { apiClient, AvailabilityType, CreateLandRequest } from '@/src/utils/api';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

interface FileItem {
  uri: string;
  name: string;
  type: string;
  isUploaded: boolean;
  onlineUrl?: string;
}

export default function RegisterLandScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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

  // Step 2 & 3: Files
  const [images, setImages] = useState<FileItem[]>([]);
  const [documents, setDocuments] = useState<FileItem[]>([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const isStep1Complete = () => {
    return (
      province.trim().length > 0 &&
      district.trim().length > 0 &&
      sector.trim().length > 0 &&
      areaSqMeters.trim().length > 0 &&
      !isNaN(parseFloat(areaSqMeters)) &&
      parseFloat(areaSqMeters) > 0 &&
      !!availabilityType
    );
  };

  const steps = ['Details', 'Images', 'Docs'];

  const validateStep1 = () => {
    if (!province.trim()) { Toast.show({ type: 'error', text1: 'Required', text2: 'Please enter province' }); return false; }
    if (!district.trim()) { Toast.show({ type: 'error', text1: 'Required', text2: 'Please enter district' }); return false; }
    if (!sector.trim()) { Toast.show({ type: 'error', text1: 'Required', text2: 'Please enter sector' }); return false; }
    const area = parseFloat(areaSqMeters);
    if (!areaSqMeters || isNaN(area) || area <= 0) {
      Toast.show({ type: 'error', text1: 'Invalid Area', text2: 'Please enter a valid area in sq meters' });
      return false;
    }
    if (!availabilityType) {
      Toast.show({ type: 'error', text1: 'Required', text2: 'Please select availability type' });
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages: FileItem[] = result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.fileName || `img_${Date.now()}.jpg`,
        type: asset.mimeType || 'image/jpeg',
        isUploaded: false,
      }));
      setImages([...images, ...newImages].slice(0, 10));
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      multiple: true,
    });

    if (!result.canceled) {
      const newDocs: FileItem[] = result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType || 'application/octet-stream',
        isUploaded: false,
      }));
      setDocuments([...documents, ...newDocs].slice(0, 5));
    }
  };

  const uploadFiles = async (items: FileItem[], type: 'image' | 'doc') => {
    const uploadedItems = [...items];
    let allSuccess = true;

    for (let i = 0; i < uploadedItems.length; i++) {
      if (!uploadedItems[i].isUploaded) {
        try {
          const response = await apiClient.uploadFile(
            uploadedItems[i].uri, 
            type === 'image' ? 'land_images' : 'land_docs',
            uploadedItems[i].name,
            uploadedItems[i].type
          );
          uploadedItems[i] = {
            ...uploadedItems[i],
            isUploaded: true,
            onlineUrl: response.url
          };
        } catch (error) {
          console.error(`Upload failed for ${uploadedItems[i].name}:`, error);
          allSuccess = false;
        }
      }
    }
    
    if (type === 'image') setImages(uploadedItems);
    else setDocuments(uploadedItems);
    
    return { success: allSuccess, items: uploadedItems };
  };

  const goToNextStep = () => {
    if (currentStep === 0 && !validateStep1()) return;
    
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
    if (images.length === 0) {
      Toast.show({ type: 'error', text1: 'Images Required', text2: 'Please add at least one image' });
      return;
    }

    try {
      setSubmitting(true);
      
      // 1. Upload images if not uploaded
      const { success: imagesSuccess, items: finalImages } = await uploadFiles(images, 'image');
      if (!imagesSuccess) {
        Toast.show({ type: 'error', text1: 'Upload Failed', text2: 'Some images failed to upload. Try again.' });
        setSubmitting(false);
        return;
      }

      // 2. Upload documents if not uploaded
      let finalDocuments = documents;
      if (documents.length > 0) {
          const { success: docsSuccess, items: updatedDocs } = await uploadFiles(documents, 'doc');
          if (!docsSuccess) {
            Toast.show({ type: 'error', text1: 'Upload Failed', text2: 'Some documents failed to upload. Try again.' });
            setSubmitting(false);
            return;
          }
          finalDocuments = updatedDocs;
      }

      // 3. Prepare data
      const landData: CreateLandRequest = {
        province,
        district,
        sector,
        areaSqMeters: parseFloat(areaSqMeters),
        availabilityType: availabilityType!,
        imageUrls: finalImages.map(img => img.onlineUrl!).filter(url => !!url),
        documentUrls: finalDocuments.map(doc => doc.onlineUrl!).filter(url => !!url),
      };

      // 4. Submit to Land Service
      await apiClient.createLand(landData);

      Toast.show({
        type: 'success',
        text1: 'Land Registered!',
        text2: 'Your land has been submitted for verification.',
      });

      setTimeout(() => {
        router.back();
      }, 2000);

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message || 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a', '#0f1f0f'] : ['#f8fafc', '#ffffff', '#f0fdf4']}
        style={StyleSheet.absoluteFill}
      />

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
          <Text style={[styles.headerTitle, { color: theme.text }]}>Register Land</Text>
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
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {/* Step 1: Land Details */}
          <ScrollView
            style={{ width }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.stepContent, { paddingBottom: insets.bottom + 180 }]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.formCard, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
            }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="location-on" size={20} color="#11d421" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Location</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Province</Text>
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                  placeholder="e.g., Kigali"
                  value={province}
                  onChangeText={setProvince}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>District</Text>
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                  placeholder="e.g., Gasabo"
                  value={district}
                  onChangeText={setDistrict}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Sector</Text>
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                  placeholder="e.g., Remera"
                  value={sector}
                  onChangeText={setSector}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Area (Sq Meters)</Text>
                <TextInput
                  style={[styles.input, { color: theme.text, backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                  placeholder="e.g., 5000"
                  keyboardType="numeric"
                  value={areaSqMeters}
                  onChangeText={setAreaSqMeters}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Availability</Text>
                <View style={styles.availabilityOptions}>
                  {(['SALE', 'RENT', 'HARVEST_SHARE', 'ALL'] as AvailabilityType[]).map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setAvailabilityType(type)}
                      style={[styles.availabilityOption, {
                        backgroundColor: availabilityType === type ? '#11d421' : (isDark ? '#1a1a1a' : '#fff'),
                        borderColor: availabilityType === type ? '#11d421' : (isDark ? '#333' : '#ddd')
                      }]}
                    >
                      <Text style={[styles.availabilityText, { color: availabilityType === type ? '#fff' : theme.text }]}>
                        {type.replace('_', ' ')}
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
            contentContainerStyle={[styles.stepContent, { paddingBottom: insets.bottom + 180 }]}
          >
            <View style={styles.fileSection}>
              <View style={styles.fileHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Land Images (Max 10)</Text>
                <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
                  <MaterialIcons name="add-a-photo" size={24} color="#11d421" />
                </TouchableOpacity>
              </View>

              <View style={styles.fileGrid}>
                {images.map((img, idx) => (
                  <View key={idx} style={styles.imagePreviewContainer}>
                    <Image source={{ uri: img.uri }} style={styles.imagePreview} />
                    <TouchableOpacity 
                      style={styles.removeFileButton} 
                      onPress={() => setImages(images.filter((_, i) => i !== idx))}
                    >
                      <MaterialIcons name="cancel" size={20} color="#ef4444" />
                    </TouchableOpacity>
                    {img.isUploaded && (
                      <View style={styles.uploadBadge}>
                        <MaterialIcons name="check-circle" size={16} color="#11d421" />
                      </View>
                    )}
                  </View>
                ))}
                {images.length === 0 && (
                     <TouchableOpacity onPress={pickImage} style={[styles.imagePreviewContainer, { borderStyle: 'dashed', borderWidth: 1, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' }]}>
                        <MaterialIcons name="add" size={32} color="#ddd" />
                        <Text style={{ fontSize: 10, color: '#999' }}>Add Image</Text>
                     </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Step 3: Documents */}
          <ScrollView
            style={{ width }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.stepContent, { paddingBottom: insets.bottom + 180 }]}
          >
            <View style={styles.fileSection}>
              <View style={styles.fileHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Documents (Max 5)</Text>
                <TouchableOpacity onPress={pickDocument} style={styles.pickButton}>
                  <MaterialIcons name="note-add" size={28} color="#11d421" />
                </TouchableOpacity>
              </View>

              {documents.map((doc, idx) => (
                <View key={idx} style={[styles.docItem, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
                  <MaterialIcons name="description" size={24} color="#11d421" />
                  <Text style={[styles.docName, { color: theme.text }]} numberOfLines={1}>{doc.name}</Text>
                  <TouchableOpacity onPress={() => setDocuments(documents.filter((_, i) => i !== idx))}>
                    <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}

              {documents.length === 0 && (
                <View style={[styles.emptyDocs, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }]}>
                    <MaterialIcons name="file-upload" size={48} color={isDark ? '#333' : '#ddd'} />
                    <Text style={{ color: '#999', textAlign: 'center' }}>Upload land titles, certificates, or survey maps (Optional but recommended)</Text>
                    <TouchableOpacity onPress={pickDocument} style={styles.uploadCta}>
                        <Text style={{ color: '#11d421', fontFamily: 'Poppins_700Bold' }}>Select Documents</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </ScrollView>

        {/* Navigation Buttons - Hidden when keyboard is open or step 1 is incomplete */}
        {!keyboardVisible && (currentStep !== 0 || isStep1Complete()) && (
            <View style={[styles.navigationContainer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
            {currentStep > 0 && (
                <TouchableOpacity onPress={goToPreviousStep} style={styles.backNavButton}>
                <MaterialIcons name="arrow-back" size={20} color={theme.text} />
                <Text style={{ color: theme.text }}>Back</Text>
                </TouchableOpacity>
            )}

            {currentStep < 2 ? (
                <TouchableOpacity onPress={goToNextStep} style={[styles.nextNavButton, { marginLeft: 'auto' }]}>
                <LinearGradient colors={['#11d421', '#0fb31c']} style={styles.navGradient}>
                    <Text style={styles.nextButtonText}>Next</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                </LinearGradient>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleSubmit} disabled={submitting} style={[styles.nextNavButton, { marginLeft: 'auto' }]}>
                <LinearGradient colors={['#11d421', '#0fb31c']} style={styles.navGradient}>
                    {submitting ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <>
                        <Text style={styles.nextButtonText}>Submit Land</Text>
                        <MaterialIcons name="check-circle" size={20} color="#ffffff" />
                    </>
                    )}
                </LinearGradient>
                </TouchableOpacity>
            )}
            </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  backButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold' },
  progressContainer: { flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 20, alignItems: 'center' },
  stepContainer: { flex: 1, alignItems: 'center' },
  stepCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 8 },
  stepNumber: { fontSize: 14, fontFamily: 'Poppins_700Bold' },
  stepLabel: { fontSize: 11, fontFamily: 'Poppins_600SemiBold' },
  stepLine: { position: 'absolute', top: 16, left: '50%', right: '-50%', height: 2 },
  stepContent: { paddingHorizontal: 24 },
  formCard: { borderRadius: 24, padding: 24, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: 'Poppins_600SemiBold', marginBottom: 8 },
  input: { fontSize: 16, fontFamily: 'Poppins_500Medium', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#ddd' },
  availabilityOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  availabilityOption: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  availabilityText: { fontSize: 12, fontFamily: 'Poppins_600SemiBold' },
  fileSection: { gap: 20 },
  fileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pickButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(17, 212, 33, 0.1)', alignItems: 'center', justifyContent: 'center' },
  fileGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  imagePreviewContainer: { width: (width - 72) / 3, aspectRatio: 1, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  imagePreview: { width: '100%', height: '100%' },
  removeFileButton: { position: 'absolute', top: 4, right: 4, backgroundColor: 'white', borderRadius: 10 },
  uploadBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: 'white', borderRadius: 10, padding: 2 },
  docItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 12, borderWidth: 1, borderColor: '#eee' },
  docName: { flex: 1, fontSize: 14, fontFamily: 'Poppins_500Medium' },
  emptyDocs: { padding: 40, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 12 },
  uploadCta: { marginTop: 8 },
  navigationContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', paddingHorizontal: 24, gap: 12, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.05)', backgroundColor: 'transparent' },
  backNavButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 16 },
  nextNavButton: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  navGradient: { paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  nextButtonText: { color: '#ffffff', fontSize: 16, fontFamily: 'Poppins_700Bold' },
});
