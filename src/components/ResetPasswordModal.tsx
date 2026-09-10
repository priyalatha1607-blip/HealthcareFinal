import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import OTPInput from './OTPInput';

type Props = {
  visible: boolean;
  step: 'otp' | 'password';
  error: string;
  otp: string;
  setOtp: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  timeLeft: number;
  modalReady: boolean;
  onVerifyOTP: () => void;
  onUpdatePassword: () => void;
  onResendOTP: () => void;
  onCancel: () => void;
  onShow: () => void;
};

export default function ResetPasswordModal({
  visible,
  step,
  error,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  timeLeft,
  modalReady,
  onVerifyOTP,
  onUpdatePassword,
  onResendOTP,
  onCancel,
  onShow,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onShow={onShow}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          {step === 'otp' ? (
            <>
              <Text style={styles.modalTitle}>Enter OTP</Text>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <OTPInput
                length={6}
                value={otp}
                onChangeText={setOtp}
                autoFocus={modalReady}
              />
              <CustomButton title="Verify OTP" onPress={onVerifyOTP} />
              
              {timeLeft > 0 ? (
                <Text style={styles.resendText}>OTP expires in {timeLeft}s</Text>
              ) : (
                <TouchableOpacity onPress={onResendOTP} style={styles.resendButton}>
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Set New Password</Text>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <CustomInput
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                isPassword
              />
              <CustomButton title="Update Password" onPress={onUpdatePassword} />
            </>
          )}
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  resendText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 14,
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
