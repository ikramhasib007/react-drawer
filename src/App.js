import React, { Component } from "react";
import { storage } from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      url: "",
      progress: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = (e) => {
    if (e.target.files[0]) {
      const audio = e.target.files[0];
      this.setState(() => ({ audio }));
    }
  };
  handleUpload = () => {
    const { audio } = this.state;
    const uploadTask = storage.ref(`audioFile/${audio.name}`).put(audio);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("audioFile")
          .child(audio.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };
  render() {
    const style = {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div style={style}>
        <progress value={this.state.progress} max="100" />
        <br />
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <br />

        <figure>
          <figcaption>Uploaded Audio</figcaption>
          <audio
            controls
            src={this.state.url || ""}>
                Your browser does not support the
                  <code>audio</code> element.
          </audio>
        </figure>

      </div>
    );
  }
}

export default App;
