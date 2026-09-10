import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screenPadding: {
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 8,
    lineHeight: 22,
  },

  link: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});