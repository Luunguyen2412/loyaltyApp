import React, {Component} from 'react';
import MyLoader from './components/MyLoader';

const AppContext = React.createContext({});
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  showProgress = () => this.setState({loading: true});
  hideProgress = () => this.setState({loading: false});

  render() {
    const {loading} = this.state;
    const funcs = {
      showLoader: this.showProgress,
      hideLoader: this.hideProgress,
    };
    return (
      <AppContext.Provider value={{...funcs}}>
        {this.props.children}
        {/* other global component  */}
        <MyLoader loading={loading} />
      </AppContext.Provider>
    );
  }
}
