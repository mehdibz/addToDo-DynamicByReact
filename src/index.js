import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

class NewCityForm extends React.Component {
  render() {
    const onSubmit = evt => {
      evt.preventDefault();
      const cityNameInput = evt.target.elements.cityName;
      this.props.addCityName(cityNameInput.value);
      cityNameInput.value = "";
    };
    return (
      <div>
        <p>Enter a new city name</p>
        <form onSubmit={onSubmit}>
          <input type="text" name="cityName" />
          <button type="submit">Add City Name</button>
        </form>
      </div>
    );
  }
}

class CityListItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.city}
        <button onClick={this.props.deleteCity}>Delete</button>
      </li>
    );
  }
}

class CityList extends React.Component {
  constructor() {
    super(); // SUPER IMPORTANT!  IF YOU LEAVE THIS OUT, STUFF BREAKS!

    this.state = {
      cityNames: ["Vancouver", "Toronto"]
    };
    this.addCityName = this.addCityName.bind(this);
  }
  addCityName(name) {
    const oldCityNames = this.state.cityNames;
    const newCityNames = [...oldCityNames, name];
    this.setState({
      cityNames: newCityNames
    });
  }
  deleteCity(name) {
    const oldCityNames = this.state.cityNames;
    const newCityNames = oldCityNames.filter(cityName => cityName !== name);
    this.setState({
      cityNames: newCityNames
    });
  }
  render() {
    const cityListItems = this.state.cityNames.map(cityName => (
      <CityListItem
        city={cityName}
        deleteCity={() => this.deleteCity(cityName)}
      />
    ));

    return (
      <div>
        <p>Here are some cities</p>
        <ul>{cityListItems}</ul>
        <NewCityForm addCityName={this.addCityName} />
      </div>
    );
  }
}

ReactDOM.render(<CityList />, root);
