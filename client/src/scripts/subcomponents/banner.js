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
        href={this.state.link}
      >
        <img src={this.state.image} alt='no ad'/>
      </div>
    );
  }
}

export default Banner;