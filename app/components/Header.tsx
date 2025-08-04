import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/navigation';

const navLinks: Array<{ title: string, path: string }> = [
  { title: 'Home', path: 'Home' },
  { title: 'About', path: 'About' },
  { title: 'Contact', path: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
        />
        <Text style={styles.logoText}>TravelBuddy</Text>
      </TouchableOpacity>

      {/* Desktop Navigation */}
      <View style={styles.desktopNav}>
        {navLinks.map((link) => (
          <TouchableOpacity key={link.title} onPress={() => navigation.navigate(link.path)}>
            <Text style={styles.navLink}>{link.title}</Text>
          </TouchableOpacity>
        ))}
        {user && <TouchableOpacity onPress={() => navigation.navigate('FindPeople')}>
          <Text style={styles.navLink}>Find People</Text>
        </TouchableOpacity>}
        {user && <TouchableOpacity onPress={() => navigation.navigate('Itineraries')}>
          <Text style={styles.navLink}>Itineraries</Text>
        </TouchableOpacity>}
        {user && <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navLink}>Profile</Text>
        </TouchableOpacity>}
        {!user ? (
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.navLink}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.navLink}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Menu Button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuIcon}>{isMenuOpen ? '✕' : '☰'}</Text>
      </TouchableOpacity>

      {/* Mobile Menu Modal */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <View style={styles.mobileMenu}>
          <View style={styles.mobileMenuContent}>
            {navLinks.map((link) => (
              <TouchableOpacity 
                key={link.title} 
                onPress={() => {
                  navigation.navigate(link.path);
                  toggleMenu();
                }}
                style={styles.mobileNavLink}
              >
                <Text style={styles.mobileNavText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
            {user && <TouchableOpacity 
              onPress={() => {
                navigation.navigate('FindPeople');
                toggleMenu();
              }}
              style={styles.mobileNavLink}
            >
              <Text style={styles.mobileNavText}>Find People</Text>
            </TouchableOpacity>}
            {user && <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Itineraries');
                toggleMenu();
              }}
              style={styles.mobileNavLink}
            >
              <Text style={styles.mobileNavText}>Itineraries</Text>
            </TouchableOpacity>}
            {user && <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Profile');
                toggleMenu();
              }}
              style={styles.mobileNavLink}
            >
              <Text style={styles.mobileNavText}>Profile</Text>
            </TouchableOpacity>}
            {!user ? (
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate('SignIn');
                  toggleMenu();
                }}
                style={styles.mobileNavLink}
              >
                <Text style={styles.mobileNavText}>Sign In</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPress={() => {
                  signOut();
                  toggleMenu();
                }}
                style={styles.mobileNavLink}
              >
                <Text style={styles.mobileNavText}>Sign Out</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  desktopNav: {
    flexDirection: 'row',
    display: 'none', // Hidden on mobile by default
  },
  navLink: {
    color: 'white',
    marginHorizontal: 15,
    fontSize: 16,
  },
  menuButton: {
    display: 'flex', // Visible on mobile by default
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
  },
  mobileMenu: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  mobileMenuContent: {
    backgroundColor: '#222',
    padding: 20,
  },
  mobileNavLink: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  mobileNavText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Header;