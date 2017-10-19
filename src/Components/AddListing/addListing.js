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
            images: this.state.uploadedFileCloudinaryUrl,
            listing_id: 38
        }
        axios.put('/api/updateImages', test).then((res) => {
            console.log(res);
            if(res.data === "Added"){
                this.setState({
                    uploadedFileCloudinaryUrl: []
                })
            }
        })

        // let addTest = {
        //     auth_id: 'google-oauth2|111891641192346730945',
        //     user_id: 21,
        //     title: 'Test',
        //     price: 300,
        //     images: this.state.uploadedFileCloudinaryUrl,
        //     city: 'Provo',
        //     state: 'Utah',
        //     zip: 84084,
        //     description: 'This is a test that Twan and I are trying to see if we can insert a new Listing into the db',
        //     pros: 'It could work',
        //     cons: 'None, because it worked',
        //     phone_number: '801-885-5466',
        //     contact_status: 'Call Only',
        //     time_submitted: new Date(Date.now()),
        //     category: 'Electronics'
        // }
        // axios.post('/api/addListing', addTest).then((res) => {
        //     if(res.data === "Listing has been added"){
        //         this.setState({
        //             uploadedFileCloudinaryUrl: []
        //         })
        //     }
        // })
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