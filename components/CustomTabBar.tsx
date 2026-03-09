import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBar, { paddingBottom: 0 }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const isMiddle = index === Math.floor(state.routes.length / 2);

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

                // Use the defined colors from options
                const activeColor = options.tabBarActiveTintColor || '#11d421';
                const inactiveColor = options.tabBarInactiveTintColor || 'gray';
                const color = isFocused ? activeColor : inactiveColor;

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
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
                                    {options.tabBarIcon?.({ focused: isFocused, color: color, size: 28 })}
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
        bottom: 25,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#ffffff',
        borderRadius: 35,
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
    },
    activeIndicator: {
        position: 'absolute',
        top: 0, // stick to the very top of the tabItem if possible, or give some padding
        width: 20,
        height: 3,
        borderRadius: 2,
    },
    iconWrapper: {
        // optional spacing for icon
    },
    middleButton: {
        width: 65,
        height: 65,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#11d421', // will be overridden or blend depending on activeColor
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        transform: [{ translateY: -15 }],
    },
});
