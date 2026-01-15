// src/screens/ExploreScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ExploreScreen = () => {
  const farmlands = [
    {
      id: 1,
      title: 'Organic Cocoa Plantation',
      location: 'Ghana',
      type: 'Cocoa',
      risk: 'High Growth',
      price: '$45,000',
      size: '5.2 ha',
      image: 'https://images.unsplash.com/photo-1595234525962-d5eea683d5b4?auto=format&fit=crop&w=800',
    },
    {
      id: 2,
      title: 'Wheat Fields',
      location: 'South Africa',
      type: 'Wheat',
      risk: 'Medium Growth',
      price: '$32,500',
      size: '8.7 ha',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="potted-plant" size={28} color="#11d421" />
          <Text style={styles.headerTitle}>Explore Lands</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color="#0d1b0f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications" size={24} color="#0d1b0f" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for farmlands, locations..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
            <MaterialIcons name="filter-list" size={16} color="white" />
            <Text style={styles.filterTextActive}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <MaterialIcons name="agriculture" size={16} color="#0d1b0f" />
            <Text style={styles.filterText}>Crop</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0d1b0f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <MaterialIcons name="location-on" size={16} color="#0d1b0f" />
            <Text style={styles.filterText}>Location</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0d1b0f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <MaterialIcons name="verified-user" size={16} color="#0d1b0f" />
            <Text style={styles.filterText}>Risk</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0d1b0f" />
          </TouchableOpacity>
        </ScrollView>

        {/* Farmland List */}
        <View style={styles.farmlandList}>
          {farmlands.map((farmland) => (
            <View key={farmland.id} style={styles.farmlandCard}>
              <Image source={{ uri: farmland.image }} style={styles.farmlandImage} />
              <View style={styles.locationTag}>
                <MaterialIcons name="location-on" size={12} color="white" />
                <Text style={styles.locationText}>{farmland.location}</Text>
              </View>
              <View style={styles.typeTag}>
                <MaterialIcons name="eco" size={12} color="white" />
                <Text style={styles.typeText}>{farmland.type}</Text>
              </View>
              <View style={styles.farmlandInfo}>
                <Text style={styles.riskTag}>{farmland.risk}</Text>
                <Text style={styles.farmlandTitle}>{farmland.title}</Text>
                <View style={styles.farmlandDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{farmland.price}</Text>
                    <Text style={styles.detailLabel}>Price</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{farmland.size}</Text>
                    <Text style={styles.detailLabel}>Size</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f6f8f6',
    paddingTop: 50, // Add extra padding for status bar
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#0d1b0f',
    fontFamily: 'Manrope-Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#11d421',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#0d1b0f',
    fontFamily: 'Manrope-Regular',
  },
  filterScrollView: {
    paddingBottom: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilter: {
    backgroundColor: '#11d421',
    borderColor: '#11d421',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0d1b0f',
    marginLeft: 4,
    marginRight: 2,
    fontFamily: 'Manrope-Medium',
  },
  filterTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
    fontFamily: 'Manrope-SemiBold',
  },
  farmlandList: {
    padding: 16,
    paddingTop: 8,
  },
  farmlandCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  farmlandImage: {
    width: '100%',
    height: 200,
  },
  locationTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Manrope-SemiBold',
  },
  typeTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 212, 33, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Manrope-SemiBold',
  },
  farmlandInfo: {
    padding: 16,
  },
  riskTag: {
    color: '#11d421',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'Manrope-Bold',
  },
  farmlandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d1b0f',
    marginBottom: 16,
    fontFamily: 'Manrope-Bold',
  },
  farmlandDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d1b0f',
    marginBottom: 2,
    fontFamily: 'Manrope-Bold',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Manrope-Regular',
  },
  viewButton: {
    backgroundColor: '#11d421',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
});

export default ExploreScreen;