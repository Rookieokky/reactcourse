import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getinitialstate
    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    // this runs before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      //Update <App> component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      // Use JSON.parse to convert the localStorageRef string back into an object
      });
    }

  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log({nextProps, nextState});
    // nextProps displays all of the properties within an object
    // nextState displays all of the states within an object
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
    // cannot store anobject in the value of localStorage, only strings so we use JSON.stringify to return a string
  }

  addFish(fish) {
    // update state
    const fishes = {...this.state.fishes};
    // add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
     this.setState({ fishes: fishes })
    // addFish function is part of this 'global parent' component so that its data/ref state could be used by child components
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    // awlatys copy existing state when updating state
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // Take a copy of state
    const order = {...this.state.order};
    // update/add new # of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order : order })
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                // returns an array of an object's enumerable properties
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes} order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples} fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />

        { /* passing down the function from the App component through the inventory component to a child component a couple levels deep */ }
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
