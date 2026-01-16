/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#11d421';
const tintColorDark = '#11d421';

export const Colors = {
  light: {
    text: '#0d1b0f',
    background: '#f9fafb',
    card: '#ffffff',
    border: 'rgba(0, 0, 0, 0.05)',
    notification: '#ff3b30',
    tint: tintColorLight,
    tabIconDefault: '#9da4b0',
    tabIconSelected: tintColorLight,
    headerBg: '#ffffff',
    cardBg: '#ffffff',
    textSecondary: '#6b7280',
    success: '#11d421',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  dark: {
    text: '#ffffff',
    background: '#102212',
    card: '#1a3a1f',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#ff453a',
    tint: tintColorDark,
    tabIconDefault: '#9da4b0',
    tabIconSelected: tintColorDark,
    headerBg: '#1a3a1f',
    cardBg: '#1a3a1f',
    textSecondary: '#9ca3af',
    success: '#11d421',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
