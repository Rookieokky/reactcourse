import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // To use 'this' in a custom class, an option is to use a Constructor  which creates a custom class component, apart from the React Component class, using the method 'super'. By using this method, a 'this' associated with the custom component then needs to be bound with the 'this' that is automatically bound to the native component class.

  // constructor() {
  //   super();
  //   this.gotToStore = this.gotToStore bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    console.log('URL Change');
    // first, capture input from box
    const storeId = this.storeInput.value;
    console.log(`Redirecting to ${storeId}`)
    // second, transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
          { /* Comment Example */ }
          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
          <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
