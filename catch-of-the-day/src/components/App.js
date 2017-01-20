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
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getinitialstate
    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
        { /* passing down the function from the App component through the inventory component to a child component a couple levels deep */ }

      </div>
    )
  }
}

export default App;
