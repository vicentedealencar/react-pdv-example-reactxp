import RX = require('reactxp')

const PDV: any = require('react-pdv')
type CommonProps = {
  [x: string]: any;
  style?: any;
  children?: any;
}

const RegularButton: ({ style, Button, ...otherProps }: CommonProps) => JSX.Element = ({ style, ...otherProps }) => (
  <PDV.Button {...otherProps} component={otherProps.Button} style={{ marginTop: 10, ...style }} />
)

const SubmitButton: ({ style, ...otherProps }: CommonProps) => JSX.Element = ({ style, ...otherProps }) => (
  <RegularButton
    {...otherProps}
    style={{ backgroundColor: '#007777', ...style }}
  >
    COMPRAR
  </RegularButton>
)

const MonoText: ({ style, ...otherProps }: CommonProps) => JSX.Element = ({ style, ...otherProps }) => {
  return (
    <span
      style={{
        fontFamily: 'monospace',
        marginLeft: 10,
        marginRight: 10,
        ...style
      }}
      {...otherProps}
    />
  )
}

const H2Total: ({ children, ...otherProps }: CommonProps) => JSX.Element = ({ children, ...otherProps }) => (
  <h2 {...otherProps}>{`Total: ${children}`}</h2>
)

type ItemType = {
    id: string;
    name: string;
    description: string;
    amount: number;
    price: number;
}

type CartType = { items: ItemType[] }

const basicCart: CartType = {
  items: [
    {
      id: 'prod1',
      name: 'prod1',
      description: 'lorem ipsum dolor flanders',
      amount: 1,
      price: 123.45
    },
    {
      id: 'prod2',
      name: 'prod2',
      description: 'lorem ipsum dolor flanders',
      amount: 6,
      price: 678.9
    }
  ]
}

const onSubmit: (cart: CartType) => void = cart => alert(JSON.stringify(cart, null, 2))

type PropsType = {Button: any}

type StateType = {cart: CartType}

class Cart extends RX.Component<PropsType, StateType> {
  state = {
    cart: basicCart
  }

  updateCartItem: (item: ItemType) => void = item  =>
    this.setState(state => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map(it => (it.id !== item.id ? it : item))
      }
    }))

  render(): JSX.Element {
    return (
      <PDV.Cart
        cart={this.state.cart}
        updateCartItem={this.updateCartItem}
        Title={H2Total}
        Text={MonoText}
        Button={RegularButton}
        SubmitButton={() => <SubmitButton Button={this.props.Button} />}
        onSubmit={onSubmit}
        {...this.props}
      />
    )
  }
}

export = Cart
