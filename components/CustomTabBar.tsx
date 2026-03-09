import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom > 0 ? insets.bottom - 10 : 8 }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const isMiddle = index === 2; // Middle button for 5 tabs (index 2)

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
                        {isMiddle ? (
                            <View style={[styles.middleButton, { backgroundColor: activeColor }]}>
                                {options.tabBarIcon?.({ focused: isFocused, color: '#ffffff', size: 28 })}
                            </View>
                        ) : (
                            <View style={styles.iconContainer}>
                                {isFocused && (
                                    <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />
                                )}
                                <View style={styles.iconWrapper}>
                                    {options.tabBarIcon?.({ focused: isFocused, color: color, size: 26 })}
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        paddingHorizontal: 8,
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
        height: '100%',
        width: '100%',
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: 12,
        width: 24,
        height: 3,
        borderRadius: 2,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleButton: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#11d421',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        transform: [{ translateY: -10 }],
    },
});
