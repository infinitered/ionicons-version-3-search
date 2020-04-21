// Icon list
var Icons = React.createClass({
  render: function(){
    var showModal = this.props.showModal;
    var icons = this.props.icons.map(function(icon){
      return (
        <Icon
          key={icon.name}
          icon={icon}
          showModal={showModal} />
      );
    });

    return (
      <div id="icons">
        {icons}
      </div>
    );
  }
});




var Icon = React.createClass({
  handleClick: function(){
    this.props.showModal(this.props.icon);
  },

  render: function(){
    var icon = this.props.icon;

    return (
      <div className="icon-container" onClick={this.handleClick}>
        <i className={"icon ion-" + icon.name}></i>
        <span className="text-muted name">
          {icon.name}
        </span>
      </div>
    );
  }
})




// Search form
var SearchForm = React.createClass({
  handleFilterChange: function(event){
    var newFilterText = ReactDOM.findDOMNode(this.refs.search).value;
    this.props.filter(newFilterText);
  },

  render: function(){
    return (
      <div id="search">
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="&#xf4a5; Search icons"
              className="form-control"
              style={{fontFamily: 'Arial, Ionicons'}}
              ref="search"
              value={this.props.filterText}
              onChange={this.handleFilterChange} />
          </div>
        </form>
      </div>
    );
  }
});




// Icon modal with detail
var IconModal = React.createClass({
  render: function(){
    var icon = this.props.icon,
        fullHTML = '<i class="icon ion-' + icon.name + '"></i>';

    return (
      <div className="modal fade" id="iconModal" tabindex="-1" role="dialog" aria-labelledby="iconModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="iconModalLabel">{icon.name}</h4>
            </div>
            <div className="modal-body">
              <div className="sample-sizes">
                <SampleIcon size="12" iconName={icon.name} />
                <SampleIcon size="24" iconName={icon.name} />
                <SampleIcon size="48" iconName={icon.name} />
                <SampleIcon size="96" iconName={icon.name} />
              </div>

              <div className="quick-copy-inputs">
                <QuickCopyInput
                  label={"Full HTML"}
                  inputValue={fullHTML} />
                <QuickCopyInput
                  label={"Classname"}
                  inputValue={"ion-" + icon.name} />
                <QuickCopyInput
                  label={"Escaped HTML"}
                  inputValue={icon.code.replace("0x", "&#x") + ";"} />
                <QuickCopyInput
                  label={"CSS Content"}
                  inputValue={icon.code.replace("0x", "\\")} />
                <DirectCopyInput
                  label="Direct Copy"
                  code={icon.code.replace('0x', '&#x') + ';'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});




var SampleIcon = React.createClass({
  render: function(){
    var size = this.props.size;
    return (
      <div className="sample-icon">
        <i className={"icon ion-" + this.props.iconName} style={{fontSize: size + 'px'}}></i>
        <div className="font-size-amount text-center">{size}</div>
      </div>
    );
  }
});




var QuickCopyInput = React.createClass({
  handleClick: function(event){
    event.target.select();
  },

  render: function(){
    return (
      <div className="form-group quick-copy">
        <label>{this.props.label}</label>
        <input className="form-control" type="text" readOnly="readonly" onClick={this.handleClick} value={this.props.inputValue} />
      </div>
    );
  }
});


var DirectCopyInput = React.createClass({
  handleClick: function (event) {
    event.target.select()
  },

  componentDidUpdate: function () {
    const container = document.createElement('label')
    container.innerHTML = this.props.code
    this.refs.input.value = container.innerText
  },

  render: function () {
    return (
      <div className="form-group quick-copy">
        <label>{this.props.label}</label>
        <input
          ref="input"
          className="form-control"
          style={{ fontFamily: 'Ionicons' }}
          type="text"
          readOnly="readonly"
          onClick={this.handleClick}
        />
      </div>
    )
  },
})


// Main container component
var Main = React.createClass({
  getInitialState: function(){
    return {
      icons: cleanIcons_3_0,
      filterText: '',
      selectedIcon: cleanIcons_3_0[0]
    }
  },

  filter: function(newText){
    this.setState({filterText: newText});
  },

  filteredIcons: function(){
    var icons = this.state.icons,
        filterTextLower = this.state.filterText.toLowerCase();

    if (filterTextLower !== ''){
      icons = icons.filter(function(icon){
        var filterWords = filterTextLower.split('-'),
            nameAndTags = icon.name + '-' + icon.tags.join(' ') + '-' + icon.communityTags.join(' ');

        for (var i = 0; i < filterWords.length; i++) {
          if (nameAndTags.indexOf(filterWords[i]) === -1){
            return false;
          }
        }
        // return (nameAndTags.indexOf(filterTextLower) !== -1);
        return true;
      });
    }

    return icons;
  },

  showModal: function(icon){
    this.setState({selectedIcon: icon});
    $('#iconModal').modal();
  },

  render: function(){
    return (
      <div id="main">
        <SearchForm
          filterText={this.state.filterText}
          filter={this.filter}  />
        <Icons
          icons={this.filteredIcons()}
          showModal={this.showModal} />
        <IconModal icon={this.state.selectedIcon} />
      </div>
    );
  }
});

ReactDOM.render(
  <Main />,
  document.getElementById("app")
);
