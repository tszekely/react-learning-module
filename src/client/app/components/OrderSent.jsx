import React from 'react';

class OrderSent extends React.Component {
  componentDidMount() {
    if (!this.props.location.state || !this.props.location.state.fromCheckout) {
      this.context.router.push({
        pathname: '',
        state: {
          fromCheckout: false
        }
      });
    }
  }

  componentWillUnmount() {
    this.context.router.push({
      state: {
        fromCheckout: false
      }
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1>The order was successfully placed!</h1>

        <p className="text-muted">Please wait forever for your order to arrive.</p>
      </div>
    );
  }
}

OrderSent.propTypes = {
  location: React.PropTypes.object.isRequired
};

OrderSent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default OrderSent;