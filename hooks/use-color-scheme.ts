import { useColorScheme as _useColorScheme, ColorSchemeName } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'app_theme';

export function useColorScheme() {
  const systemColorScheme = _useColorScheme();
  const [storedTheme, setStoredTheme] = useState<ColorSchemeName>();
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setStoredTheme(savedTheme as ColorSchemeName);
        } else {
          setStoredTheme(systemColorScheme);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
        setStoredTheme(systemColorScheme);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  // Function to change theme
  const setColorScheme = async (theme: ColorSchemeName) => {
    try {
      if (theme) {
        await AsyncStorage.setItem(THEME_KEY, theme);
        setStoredTheme(theme);
      } else {
        // If theme is null, use system theme and remove from storage
        await AsyncStorage.removeItem(THEME_KEY);
        setStoredTheme(systemColorScheme);
      }
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const toggleColorScheme = () => {
    setColorScheme(storedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    colorScheme: storedTheme || 'light',
    isDark: storedTheme === 'dark',
    isLight: storedTheme === 'light',
    setColorScheme,
    toggleColorScheme,
    isLoading,
  };
}

export type { ColorSchemeName };
