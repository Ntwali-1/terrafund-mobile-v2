import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Step 1: Identify the current active route and its options
    const currentRoute = state.routes[state.index];
    const currentOptions = descriptors[currentRoute.key].options;
    const tabBarStyle = currentOptions.tabBarStyle as any;
    
    // Step 2: Hide the tab bar if display: 'none' is set for the current screen
    if (tabBarStyle?.display === 'none') {
        return null;
    }

    // Step 3: Filter routes that should be visible in the tab bar
    const visibleRoutes = state.routes.filter(route => {
        const options = descriptors[route.key].options as any;
        return options.href !== null;
    });

    // We'll specifically target 'register-land' as the middle large button
    const middleRouteName = 'register-land';

    return (
        <View style={[
            styles.tabBar, 
            { 
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                shadowColor: isDark ? '#000' : '#11d421',
                bottom: insets.bottom > 0 ? insets.bottom + 10 : 20
            }
        ]}>
            {visibleRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.routes[state.index].key === route.key;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const activeColor = options.tabBarActiveTintColor || '#11d421';
                const inactiveColor = options.tabBarInactiveTintColor || 'gray';
                const color = isFocused ? activeColor : inactiveColor;

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.iconContainer, isFocused && { backgroundColor: isDark ? 'rgba(17, 212, 33, 0.15)' : 'rgba(17, 212, 33, 0.1)' }]}>
                            <View style={styles.iconWrapper}>
                                {options.tabBarIcon?.({ focused: isFocused, color: color, size: 22 })}
                            </View>
                            {isFocused && (
                                <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        left: 20,
        right: 20,
        height: 72,
        borderRadius: 36, // pill shape
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 48,
        borderRadius: 24,
        position: 'relative',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 6,
        width: 16,
        height: 3,
        borderRadius: 2,
    },
    middleButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#11d421',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
        transform: [{ translateY: -18 }],
    },
});
