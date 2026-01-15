// src/screens/WalletScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WalletScreen = () => {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 5000,
      date: '2025-01-15',
      description: 'Initial Deposit',
      icon: 'account-balance-wallet',
    },
    {
      id: 2,
      type: 'investment',
      amount: -2500,
      date: '2025-01-10',
      description: 'Cocoa Farm Investment',
      icon: 'agriculture',
    },
    {
      id: 3,
      type: 'dividend',
      amount: 350,
      date: '2025-01-05',
      description: 'Dividend Payment',
      icon: 'payments',
    },
  ];

  const totalBalance = 2850;
  const totalInvested = 2500;
  const totalEarnings = 350;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="account-balance-wallet" size={28} color="#11d421" />
          <Text style={styles.headerTitle}>My Wallet</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications" size={24} color="#0d1b0f" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${totalBalance.toLocaleString()}</Text>
        
        <View style={styles.balanceDetails}>
          <View style={styles.balanceDetailItem}>
            <Text style={styles.detailLabel}>Invested</Text>
            <Text style={styles.detailValue}>${totalInvested.toLocaleString()}</Text>
          </View>
          <View style={styles.balanceDetailItem}>
            <Text style={styles.detailLabel}>Earnings</Text>
            <Text style={[styles.detailValue, styles.earningsText]}>+${totalEarnings.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionButtonIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
            <MaterialIcons name="add" size={24} color="#11d421" />
          </View>
          <Text style={styles.actionButtonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionButtonIcon, { backgroundColor: 'rgba(13, 27, 15, 0.1)' }]}>
            <MaterialIcons name="swap-horiz" size={24} color="#0d1b0f" />
          </View>
          <Text style={styles.actionButtonText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionButtonIcon, { backgroundColor: 'rgba(13, 27, 15, 0.1)' }]}>
            <MaterialIcons name="history" size={24} color="#0d1b0f" />
          </View>
          <Text style={styles.actionButtonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <MaterialIcons 
                name={transaction.icon} 
                size={24} 
                color={transaction.type === 'dividend' ? '#11d421' : '#0d1b0f'} 
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text 
              style={[
                styles.transactionAmount,
                transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
              ]}
            >
              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
            </Text>
          </View>
        ))}
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
    paddingTop: 50,
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
  iconButton: {
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
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Manrope-Regular',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d1b0f',
    marginBottom: 20,
    fontFamily: 'Manrope-Bold',
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  balanceDetailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Manrope-Regular',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d1b0f',
    fontFamily: 'Manrope-SemiBold',
  },
  earningsText: {
    color: '#11d421',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#0d1b0f',
    fontFamily: 'Manrope-Medium',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1b0f',
    fontFamily: 'Manrope-Bold',
  },
  seeAllText: {
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
  transactionsList: {
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d1b0f',
    marginBottom: 4,
    fontFamily: 'Manrope-SemiBold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Manrope-Regular',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope-SemiBold',
  },
  positiveAmount: {
    color: '#11d421',
  },
  negativeAmount: {
    color: '#0d1b0f',
  },
});

export default WalletScreen;