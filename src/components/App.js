import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

const DEMO_STORE_ID = "sirnetz";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  sampleFishesLoaded = false;
  syncTimer = null;
  isDemoStore = false;

  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.isDemoStore = params.storeId === DEMO_STORE_ID;

    if (this.isDemoStore) {
      this.sampleFishesLoaded = true;
      this.setState({ fishes: sampleFishes });
      return;
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });

    this.syncTimer = setTimeout(() => {
      if (this.countFishes(this.state.fishes) === 0) {
        this.loadSampleFishes();
      }
    }, 1500);
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );

    if (this.isDemoStore) {
      return;
    }

    if (
      prevState.fishes !== this.state.fishes
      && !this.sampleFishesLoaded
      && this.countFishes(this.state.fishes) === 0
    ) {
      this.sampleFishesLoaded = true;
      this.loadSampleFishes();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.syncTimer);
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }

  countFishes = fishes =>
    Object.keys(fishes).filter(key => fishes[key]).length;

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.sampleFishesLoaded = true;
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    const isAdmin = this.props.location.search.includes("?");
    const layoutClass = isAdmin
      ? "catch-of-the-day"
      : "catch-of-the-day catch-of-the-day--visitor";

    return (
      <div className={layoutClass}>
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              this.state.fishes[key] ? (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ) : null
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {isAdmin && (
          <Inventory
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
          />
        )}
      </div>
    );
  }
}

export default App;
