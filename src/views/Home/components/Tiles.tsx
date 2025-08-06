import { STYLES } from "@/styles";
import { ColorValue, Pressable, View, Text, StyleSheet, Dimensions } from "react-native";


const sWidth = Dimensions.get('window').width

const squareWidth = (sWidth / 2) - (STYLES.PADDING.MIDDLE * 1.5)

interface ITileProps {
    onPress: () => void;
    title: string;
    text: string;
    backgroundColor: ColorValue;
    shadowColor: ColorValue;
    Icon: React.FC;

}

interface IWideTileProps extends ITileProps {
    points: {
        current: number;
        max: number;
        fillColor: ColorValue;
        valueColor: ColorValue;
    };
}

export const WideTile: React.FC<IWideTileProps> = ({
    onPress,
    title,
    text,
    backgroundColor,
    shadowColor,
    points,
    Icon
}) => (
    <Pressable onPress={onPress}>
        <View style={{ backgroundColor: shadowColor, paddingBottom: STYLES.PADDING.SMALL, borderRadius: 16 }}>
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon />
                    </View>
                </View>

                <View style={[styles.pointContainer, styles.pointBackground, { backgroundColor: points.fillColor }]}>
                    <View style={[
                        styles.pointContainer,
                        styles.pointValue,
                        {
                            backgroundColor: points.valueColor,
                            width: `${(points.current / points.max) * 100}%`
                        }]} />
                    <Text style={styles.pointsText}>{points.current} POINTS OUT OF {points.max}</Text>
                </View>
            </View>
        </View>
    </Pressable>
)

export const SquareTile: React.FC<ITileProps> = ({
    onPress,
    title,
    text,
    backgroundColor,
    shadowColor,
    Icon
}) => (
    <Pressable onPress={onPress}>
        <View style={{ width: squareWidth, backgroundColor: shadowColor, paddingBottom: STYLES.PADDING.SMALL, borderRadius: 16 }}>
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={styles.icon}>
                    <Icon />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </View>
    </Pressable>
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: STYLES.PADDING.MIDDLE,
        gap: STYLES.PADDING.SMALL,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        gap: STYLES.PADDING.SMALL
    },
    icon: {

    },
    title: {
        color: 'white'
    },
    text: {
        color: 'white'
    },
    pointContainer: {
        height: 35,
        borderRadius: 20
    },
    pointBackground: {
        width: '100%'
    },
    pointValue: {},
    pointsText: {
        color: 'white',
        position: 'absolute',
        left: STYLES.PADDING.SMALL,
        top: STYLES.PADDING.SMALL
    }
})