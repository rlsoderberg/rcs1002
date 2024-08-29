class ShoppingList extends React.Component {
  render() {
    return (
      <div className='Main'>
      <div className = 'img'>
          <img src = {address(filename)} width="500" height="300"></img>
      </div>

      <div className = 'container'>
          <p>{title}</p>
          <button type="button" class = "lrgbutton" onClick={this.login.bind(this)}>New Photo</button>
      </div>

      <div className="container">
          <IncrementDecrementBtn minValue={1840} maxValue={2010} />
          <p>count:{count}</p>
      </div>

      <div className = 'container'>
          <SubmitBtn/>
      </div>
      
  </div>
    );
  }
}