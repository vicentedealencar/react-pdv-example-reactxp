/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp')
import Cart = require('./Cart')

type MainPanelProps = {
    onPressNavigate: () => void;
}

const styles: { [name: string]: RX.Types.StyleRuleSet<any> } = {
    scroll: RX.Styles.createScrollViewStyle({
        flexGrow: 1,
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
}

class MainPanel extends RX.Component<MainPanelProps, null> {
    private _translationValue: RX.Animated.Value
    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet

    constructor(props: MainPanelProps) {
        super(props)

        this._translationValue = RX.Animated.createValue(-100)
        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateY: this._translationValue
                }
            ]
        })
    }

    componentDidMount(): void {
        const animation: RX.Types.Animated.CompositeAnimation = RX.Animated.timing(this._translationValue, {
              toValue: 0,
              easing: RX.Animated.Easing.OutBack(),
              duration: 500
            }
        )

        animation.start()
    }

    render(): JSX.Element {
        return (
            <RX.View useSafeInsets={ true } style={ styles.scroll }>
                <RX.ScrollView style={ styles.scroll }>
                    <RX.View style={ styles.container }>
                        <RX.Animated.Text style={ [styles.helloWorld, this._animatedStyle] }>
                            Hello World
                        </RX.Animated.Text>

                        <Cart Button={RoundButton} />

                        <RX.Link style={ styles.docLink } url={ 'https://microsoft.github.io/reactxp/docs' }>
                            View ReactXP documentation
                        </RX.Link>

                        <RoundButton onPress={ this._onPressNavigate }>
                            See More Examples
                        </RoundButton>
                    </RX.View>
                </RX.ScrollView>
            </RX.View>
        )
    }

    private _onPressNavigate = () => {
        this.props.onPressNavigate()
    }
}

const RoundButton: ({ children, ...otherProps }: {
    [x: string]: any;
    children: any;
}) => JSX.Element = ({children, style, ...otherProps}) => <RX.Button {...otherProps} style={ {...styles.roundButton, ...style} }>
<RX.Text style={ styles.buttonText }>
    {children}
</RX.Text>
</RX.Button>

export = MainPanel
