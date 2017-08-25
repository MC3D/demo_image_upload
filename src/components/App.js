import React, {Component} from 'react';
import './App.css';
import {fileUpload, saveProfile} from './../utilities/parse';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      previewImage: ''
    }

    this._handleName = this._handleName.bind(this);
    this._handleImage = this._handleImage.bind(this);
    this._saveImage = this._saveImage.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
  }

  _handleName(e) {
    let name = e.target.value;
    this.setState({name})
  }

  _handleImage(e) {
    // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
    let file = e.target.files[0];
    // we'll use this value when we save the image (see _saveImage)
    this.setState({image: file});

    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    let reader = new FileReader();
    // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
    reader.onloadend = () => {
      this.setState({previewImage: reader.result});
    }
    // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);
  }

  _saveImage(e) {
    e.preventDefault();
    let image = this.state.image;
    // method brought in from parse.js utility file
    fileUpload(image, this._saveProfile);
  }

  _saveProfile(image) {
    // image is an object with name and url properties
    // console.log('image from parse', image);
    let profile = {
      name: this.state.name,
      picture: {
        name: this.state.image.name,
        url: image.url
      }
    }

    saveProfile(profile)


    // last step: save profile to parse
  }

  render() {
    return (
      <form className='col-md-5' onSubmit={this._saveImage}>
        <div className="form-group">
          <label htmlFor="name">Enter image name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" value={this.state.name} onChange={this._handleName}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload image</label>
          {/* the file input provides a button that opens up a file picker dialog that allows the user to choose a file */}
          {/* File inputs' value attribute contains a DOMString that represents the path to the selected file(s). */}
          <input type = "file" className = "form-control" id = "image" onChange = {this._handleImage}/>
        </div>
        <div className = "form-group">
          <span>Preview image</span>
          <img src={this.state.previewImage} alt = ''/>
        </div>
        <button type = "submit" className = "btn btn-primary" >Submit</button>
      </form>
    );
  }
}

export default App;
