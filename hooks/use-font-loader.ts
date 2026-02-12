import { useFonts } from 'expo-font';
import {
    SpaceGrotesk_700Bold,
    SpaceGrotesk_600SemiBold,
} from '@expo-google-fonts/space-grotesk';
import {
    Aclonica_400Regular,
} from '@expo-google-fonts/aclonica';
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export function useFontLoader() {
    const [fontsLoaded, fontError] = useFonts({
        Aclonica_400Regular,
        SpaceGrotesk_700Bold,
        SpaceGrotesk_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    return { fontsLoaded, fontError };
}
