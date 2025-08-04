import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const travelFeatures = [
  {
    icon: '🌏',
    title: "Global Community",
    description: "Connect with travelers from over 190+ countries"
  },
  {
    icon: '🤝',
    title: "Verified Profiles",
    description: "Safe and secure community of genuine travelers"
  },
  {
    icon: '✈️',
    title: "Trip Planning",
    description: "Create and share itineraries with travel buddies"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Singapore",
    image: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg",
    text: "Found amazing travel companions for my backpacking trip across India!"
  },
  {
    name: "Mike Rodriguez",
    location: "Spain",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    text: "Met lifetime friends through this platform. Unforgettable experiences!"
  }
];

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  const { signIn } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      // If email not verified, navigate to verification screen
      if (!result.user?.isVerified) {
        navigation.navigate('VerifyEmail', { email });
      } else {
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } catch (error) {
      setError('Failed to sign in with ' + provider);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Your Journey Begins Here</Text>
          <Text style={styles.heroSubtitle}>
            Join thousands of travelers connecting, sharing experiences, and exploring together
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.gridContainer}>
          {/* Sign In Form */}
          <View style={styles.signInForm}>
            {showForgotPassword ? (
              <>
                <Text style={styles.formTitle}>Reset Your Password</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    value={forgotPasswordEmail}
                    onChangeText={setForgotPasswordEmail}
                    placeholder="your@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity 
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => setShowForgotPassword(false)}
                  >
                    <Text style={styles.buttonText}>Back to Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.primaryButton]}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.buttonText}>Send Reset Link</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.formTitle}>Welcome Back, Explorer!</Text>
                
                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="your@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Password</Text>
                    <TouchableOpacity onPress={handleForgotPassword}>
                      <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.button, styles.primaryButton, styles.fullWidthButton]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.oauthContainer}>
                  <TouchableOpacity
                    style={[styles.oauthButton, styles.googleButton]}
                    onPress={() => handleOAuthSignIn('google')}
                    disabled={isLoading}
                  >
                    <FontAwesome name="google" size={20} color="#DB4437" />
                    <Text style={[styles.oauthButtonText, styles.googleButtonText]}>
                      Continue with Google
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.oauthButton, styles.githubButton]}
                    onPress={() => handleOAuthSignIn('github')}
                    disabled={isLoading}
                  >
                    <FontAwesome name="github" size={20} color="black" />
                    <Text style={[styles.oauthButtonText, styles.githubButtonText]}>
                      Continue with Github
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          {/* Features & Testimonials */}
          <View style={styles.featuresContainer}>
            {/* Features */}
            <View style={styles.featuresGrid}>
              {travelFeatures.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>

            {/* Testimonials */}
            <View style={styles.testimonialsContainer}>
              {testimonials.map((testimonial, index) => (
                <View key={index} style={styles.testimonialCard}>
                  <Image
                    source={{ uri: testimonial.image }}
                    style={styles.testimonialImage}
                  />
                  <View style={styles.testimonialContent}>
                    <Text style={styles.testimonialRating}>★★★★★</Text>
                    <Text style={styles.testimonialText}>{testimonial.text}</Text>
                    <Text style={styles.testimonialAuthor}>
                      <Text style={styles.testimonialName}>{testimonial.name}</Text>
                      <Text> • {testimonial.location}</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Stats */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, styles.blueStat]}>50K+</Text>
                <Text style={styles.statLabel}>Active Travelers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, styles.purpleStat]}>190+</Text>
                <Text style={styles.statLabel}>Countries</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, styles.greenStat]}>100K+</Text>
                <Text style={styles.statLabel}>Connections Made</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Ready to Start Your Adventure?</Text>
        <Text style={styles.ctaSubtitle}>
          Join our community of passionate travelers and explore the world together
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Create Free Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    paddingBottom: 40,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    maxWidth: 350,
  },
  contentContainer: {
    marginTop: -40,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  signInForm: {
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#4dabf7',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#3d3d3d',
    borderRadius: 12,
    padding: 15,
    color: 'white',
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#4dabf7',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 15,
  },
  fullWidthButton: {
    width: '100%',
    marginVertical: 10,
  },
  oauthContainer: {
    marginTop: 20,
    gap: 10,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  googleButton: {
    backgroundColor: 'white',
  },
  githubButton: {
    backgroundColor: 'white',
  },
  oauthButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButtonText: {
    color: '#5f6368',
  },
  githubButtonText: {
    color: 'black',
  },
  featuresContainer: {
    gap: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    minWidth: '30%',
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  featureTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  testimonialsContainer: {
    gap: 15,
  },
  testimonialCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  testimonialImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  testimonialContent: {
    flex: 1,
  },
  testimonialRating: {
    color: '#ffc107',
    fontSize: 14,
    marginBottom: 5,
  },
  testimonialText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 5,
  },
  testimonialAuthor: {
    color: '#b0b0b0',
    fontSize: 12,
  },
  testimonialName: {
    fontWeight: 'bold',
    color: 'white',
  },
  statsCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blueStat: {
    color: '#4dabf7',
  },
  purpleStat: {
    color: '#9c27b0',
  },
  greenStat: {
    color: '#4caf50',
  },
  statLabel: {
    color: '#b0b0b0',
    fontSize: 12,
  },
  ctaContainer: {
    backgroundColor: '#4dabf7',
    padding: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 300,
  },
  ctaButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  ctaButtonText: {
    color: '#4dabf7',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignInScreen;