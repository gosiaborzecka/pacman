import React, { Component } from 'react';
import { ReactComponent as GhostSVG} from './ghost.svg';
import './styles.css';

class Ghost extends Component {

    state = {
        directoion: 'left',
        position: {
            top: 50 * 3,
            left: 50 * 3
        }
    }

    componentDidMount(){
        this.changeDirectionInterval = setInterval(this.changeDirection, 2000);
        this.moveInterval = setInterval(this.move, 2000);
    }

    componentWillUnmount(){
        clearInterval(this.changeDirectionInterval);
        clearInterval(this.moveInterval);
    }

    changeDirection = () => {
        const arrayOfMovement = ['left', 'up', 'down', 'right'];
        const movement = Math.floor(Math.random() * 4);

        this.setState({
            directoion: arrayOfMovement[movement]
        });
    }

    move = () => {
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const { directoion} = this.state;
        const {step, border, size, topScoreBoardHeight} = this.props;

        switch (directoion) {
            case 'up':
                this.setState({
                    position: {
                      // top: currentTop - step,
                      top: Math.max(currentTop - step, 0),
                      left: currentLeft
                    }
                  });
                break;
            case 'right':
                this.setState({
                    position: {
                      top: currentTop,
                      // left: currentLeft + step
                      left: Math.min(currentLeft + step, window.innerWidth - border - size)
                    }
                  });
                break;
            case 'down':
                this.setState({
                    position: {
                      // top: currentTop + step,
                      top: Math.min(currentTop + step, window.innerHeight - border - size - topScoreBoardHeight),
                      left: currentLeft
                    }
                  });
                break;
            case 'left':
                this.setState({
                    position: {
                      top: currentTop,
                      // left: currentLeft - step
                      left: Math.max(currentLeft - step, 0)
                    }
                  });
                break;
            default:
                break;
        }
    }

    render() {
        const { color } = this.props;
        return (
          <div style={this.state.position} className="ghost">
            <GhostSVG className={`ghost-${color}`} />
          </div>
        )
      }
    }

    Ghost.defaultProps = {
        color: 'pink',
        step: 50, // 50px
        size: 50, // ghost size: 50x50px
        // TODO: move to config
        border: 10 * 2,
        topScoreBoardHeight: 50
      }

export default Ghost;