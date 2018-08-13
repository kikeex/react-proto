import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LeftContainer from './LeftContainer.jsx';
import MainContainer from './MainContainer.jsx';
import RightContainer from './RightContainer.jsx';
import convertIdToObjs from '../utils/convertIdsToObjs.util';
import theme from '../components/theme';

const mapStateToProps = store => ({
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  expandedPanelId: store.workspace.expandedPanelId,
});

class AppContainer extends Component {
  state = {
    width: 25,
    rightColumnOpen: true,
  }

  collapseColumn = () => {
    if (this.state.width === 25) {
      this.setState({
        width: 0,
        rightColumnOpen: false,
      });
    } else {
      this.setState({
        width: 25,
        rightColumnOpen: true,
      });
    }
  }

  render() {
    const { components, totalComponents, expandedPanelId } = this.props;
    const { width, rightColumnOpen } = this.state;
    const updatedComponents = convertIdToObjs(components);

    return (
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <LeftContainer
            components={updatedComponents}
            totalComponents={totalComponents}
            expandedPanelId={expandedPanelId}
          />
          <MainContainer
            components={updatedComponents}
            collapseColumn={this.collapseColumn}
            width={width}
            rightColumnOpen={rightColumnOpen}
            totalComponents={totalComponents}
          />
          <RightContainer
            width={width}
            components={updatedComponents}
            rightColumnOpen={rightColumnOpen}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(AppContainer);

AppContainer.propTypes = {
  components: PropTypes.array.isRequired,
  totalComponents: PropTypes.number.isRequired,
  expandedPanelId: PropTypes.string.isRequired,
};
