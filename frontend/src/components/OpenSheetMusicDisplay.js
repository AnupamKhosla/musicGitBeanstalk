import React, { Component } from 'react';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';

class OpenSheetMusicDisplay extends Component {
    constructor(props) {
      super(props);
      this.state = { dataReady: false };
      this.osmd = undefined;
      this.divRef = React.createRef();
    }
  
    setupOsmd() {      
      const options = {
        autoResize: this.props.autoResize !== undefined ? this.props.autoResize : true,
        drawTitle: this.props.drawTitle !== undefined ? this.props.drawTitle : true,
      }      
      this.osmd = new OSMD(this.divRef.current, options);        
        
      this.osmd.load(this.props.file).then(() => {   
        this.osmd.zoom = 0.75; //zoom not working??        
        this.osmd.render(); 
      });
    }
  
    resize() {
      //this.forceUpdate();
      //forceUpdate is not available, secondly needs bind in the constructor
    }
  
    componentWillUnmount() {
      //console.log("OSMD unmount");
      //window.removeEventListener('resize', this.resize);  

    }
  
    componentDidUpdate(prevProps) {
      //OG code conditions
      if (this.props.drawTitle !== prevProps.drawTitle) {
        this.setupOsmd();
      } else {
        this.osmd.load(this.props.file).then(() => {   
          this.osmd.zoom = 0.75; //zoom not working??        
          this.osmd.render(); 
        });
      }
      //window.addEventListener('resize', this.resize);
    }
  
    // Called after render
    componentDidMount() {
      //console.log("mount");
      //this.setupOsmd();
      //For trict mode to work don't call setupOsmd here
      // Instead if it's a second mount event then this.osmd will be defined 
      // and loading same file is probable cached and osmd.render event becomes buggy
      if (this.osmd === undefined) {
        this.setupOsmd();
      }
    }
  
    render() {
      //console.log("render");
      return (<div ref={this.divRef} />);
    }
  }

  export default OpenSheetMusicDisplay;