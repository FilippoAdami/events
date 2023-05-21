import React from 'react';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      id_publisher: props.id_publisher,
      title: props.title,
      descrizione: props.descrizione,
      image: props.image,
      budget: props.budget,
      link: props.link,
      clicks: props.clicks,
      views: props.views,
      show: props.show
    };
  }

  render() {
    return (
      <div
        id="banner"
        className="inserzione"
        type="banners"
        key={this.state.id}
      >
        <div>{this.state.title} (ID: {this.state.id})</div>
        <div>{this.state.descrizione}</div>
        <div>{this.state.image}</div>
        <div>{this.state.budget}</div>
        <div>{this.state.link}</div>
        <div>{this.state.clicks}</div>
        <div>{this.state.views}</div>
        <div>{this.state.show}</div>
      </div>
    );
  }
}

export default Banner;