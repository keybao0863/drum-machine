
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];


class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  //add key listener
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  //function to play sound
  playSound(e) {
    let sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.volume = this.props.volume;
    sound.play();
    this.props.displayName(this.props.clipId);
  }

  //function to handle key press
  handleKeyPress(e) {
    if (e.keyCode == this.props.keyCode) {
      this.playSound();
    }
  }

  render() {
    return (
      React.createElement("div", { className: "drum-pad", id: this.props.clipId,
        onClick: this.playSound },
      React.createElement("audio", { className: "clip", id: this.props.keyTrigger, src: this.props.url }),
      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let curPad = this.props.currentBank.map((curObj, i, padArry) => {
      return React.createElement(DrumPad, {
        clipId: curObj.id,
        keyCode: curObj.keyCode,
        keyTrigger: curObj.keyTrigger,
        url: curObj.url,
        displayName: this.props.displayName,
        volume: this.props.volume });

    });

    return (
      React.createElement("div", { id: "padBank" },
      curPad));


  }}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "drum",
      volume: 0.5,
      currentBank: bankOne };


    this.displayName = this.displayName.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
  }

  //display clip's name
  displayName(name) {
    this.setState({
      display: name });

  }

  //volume change
  volumeChange(e) {
    this.setState({
      volume: e.target.value,
      display: "Volume: " + Math.round(e.target.value * 100) });

  }

  //toggleBank
  toggleBank(e) {
    if (this.state.currentBank == bankOne) {
      this.setState({
        currentBank: bankTwo,
        display: "Smooth Piano Kit" });

    } else
    {
      this.setState({
        currentBank: bankOne,
        display: "Heater Kit" });

    }

  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },

      React.createElement(PadBank, { displayName: this.displayName,
        volume: this.state.volume,
        currentBank: this.state.currentBank }),
      React.createElement("div", { id: "controls" },

      React.createElement("div", { id: "display" },
      this.state.display),

      React.createElement("div", { className: "volumeContainer" },
      React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", id: "myRange", name: "volume", onChange: this.volumeChange }),
      React.createElement("label", { for: "volume" }, "Volume")),


      React.createElement("div", { id: "bankcontainer" },
      React.createElement("label", { className: "switch" },
      React.createElement("input", { type: "checkbox", onChange: this.toggleBank }),
      React.createElement("span", { className: "slider round" }))))));






  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));