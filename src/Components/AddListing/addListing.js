import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import './test.css';

class AddListing extends Component {
    constructor() {
        super()
        this.state = {
            uploadedFileCloudinaryUrl: [],
            uploadedFile: []
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files
        });

        this.handleImageUpload(files);
    }

    handleImageUpload(file) {
        for (let i = 0; i < file.length; i++) {
            let upload = request.post(process.env.REACT_APP_UPLOAD_URL)
                .field('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
                .field('file', file[i]);

            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }

                if (response.body.secure_url !== '') {
                    console.log(response.body.secure_url);
                    this.setState({
                        uploadedFileCloudinaryUrl: [... this.state.uploadedFileCloudinaryUrl, response.body.secure_url]
                    });
                }
            });
        }
    }

    upload(){
        let test = {
            image: this.state.uploadedFileCloudinaryUrl,
            listing_id: 34
        }
        axios.put('/api/updateImages', test).then((res) => {
            console.log(res);
            if(res.data === "Added"){
                this.setState({
                    uploadedFileCloudinaryUrl: []
                })
            }
        })
    }

    render() {
        let mappedImages = this.state.uploadedFileCloudinaryUrl.map((image, i) => {
            return <div key={i}>
                <img src={image} />
            </div>
        })
        return (
            <div>
                <h1>Add Listing page</h1>
                <div className='test'>
                    <Dropzone
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                </div>
                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' 
                    ? 
                    null 
                    :
                    mappedImages 
                    }
                </div>
                <button onClick={() => this.upload()}>Upload</button>
            </div>
        )
    }
}

export default AddListing