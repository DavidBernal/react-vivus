import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vivus from 'vivus';

class ReactVivus extends Component {
  // Vivus type
  static DELAYED = 'delayed';
  static SYNC = 'sync';
  static ONE_BY_ONE = 'oneByOne';

  // Timing functions
  static LINEAR = 'linear';
  static EASE = 'ease';
  static EASE_IN = 'easeIn';
  static EASE_OUT = 'easeOut';
  static EASE_OUT_BOUNCE = 'easeOutBounce';

  constructor(props) {
    super(props);
    this.style = {};
  }

  componentWillMount() {
    // We don't want this to be re-rendered so save all the props locally
    const { color, name } = this.props;

    this.style = {
      stroke: color,
    };
    this.divId = `react-vivus-holder-${name}`;
  }

  componentDidMount() {
    const {
      svg,
      duration,
      type,
      pathTiming,
      animTiming,
      onAnimationFinished,
    } = this.props;

    this.vivus = new Vivus(this.divId, {
      file: svg,
      duration,
      type,
      pathTimingFunction: this.getTimingFunction(pathTiming),
      animTimingFunction: this.getTimingFunction(animTiming),
    }, onAnimationFinished);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate() {
    // Don't re-render this component
    return false;
  }

  componentWillUnmount() {
    delete this.vivus;
  }

  getTimingFunction = (val) => {
    const timingFunctionMap = {
      [ReactVivus.LINEAR]: Vivus.LINEAR,
      [ReactVivus.EASE]: Vivus.EASE,
      [ReactVivus.EASE_IN]: Vivus.EASE_IN,
      [ReactVivus.EASE_OUT]: Vivus.EASE_OUT,
      [ReactVivus.EASE_OUT_BOUNCE]: Vivus.EASE_OUT_BOUNCE,
    };

    return timingFunctionMap[val] || Vivus.LINEAR;
  };

  getDivHolder() {
    return this.divHolder;
  }

  render() {
    const { className } = this.props;

    return (
      <div
        id={this.divId}
        className={className}
        style={this.style}
        ref={(div) => { this.divHolder = div; }}
      />
    );
  }
}

export const VivusTypePropTypes = PropTypes.oneOf([
  ReactVivus.DELAYED,
  ReactVivus.SYNC,
  ReactVivus.ONE_BY_ONE,
]);

export const TimingPropType = PropTypes.oneOf([
  ReactVivus.LINEAR,
  ReactVivus.EASE,
  ReactVivus.EASE_IN,
  ReactVivus.EASE_OUT,
  ReactVivus.EASE_OUT_BOUNCE,
]);

ReactVivus.propTypes = {
  svg: PropTypes.string.isRequired,
  duration: PropTypes.number,
  type: VivusTypePropTypes,
  pathTiming: TimingPropType,
  animTiming: TimingPropType,
  color: PropTypes.string,
  onAnimationFinished: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
};

ReactVivus.defaultProps = {
  duration: 200,
  type: ReactVivus.DELAYED,
  pathTiming: ReactVivus.LINEAR,
  animTiming: ReactVivus.LINEAR,
  onAnimationFinished: null,
  name: `${new Date().getTime()}`,
};

export const REACT_VIVUS_DELAYED = ReactVivus.DELAYED;
export const REACT_VIVUS_SYNC = ReactVivus.SYNC;
export const REACT_VIVUS_ONE_BY_ONE = ReactVivus.ONE_BY_ONE;

export const REACT_VIVUS_LINEAR = ReactVivus.LINEAR;
export const REACT_VIVUS_EASE = ReactVivus.EASE;
export const REACT_VIVUS_EASE_IN = ReactVivus.EASE_IN;
export const REACT_VIVUS_EASE_OUT = ReactVivus.EASE_OUT;
export const REACT_VIVUS_EASE_OUT_BOUNCE = ReactVivus.EASE_OUT_BOUNCE;

export default ReactVivus;
