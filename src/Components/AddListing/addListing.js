import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import './test.css';
import Paper from 'material-ui/Paper';
import './addListing.css';
import TextField from 'material-ui/TextField';
// import Grid from 'material-ui/Grid';
// import Typography from 'material-ui/Typography';
// import List, {
//     ListItem,
//     ListItemAvatar,
//     ListItemIcon,
//     ListItemSecondaryAction,
//     ListItemText,
// } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
// import AddIcon from 'material-ui-icons/AddCircle';
import Button from 'material-ui/Button';
class AddListing extends Component {
	constructor() {
		super();
		this.state = {
			uploadedFileCloudinaryUrl: [],
			uploadedFile: [],
			pros: [],
			cons: [],
			prosInput: '',
			consInput: ''
		};
	}

	onImageDrop(files) {
		this.setState({
			uploadedFile: files
		});

		this.handleImageUpload(files);
	}

	handleImageUpload(file) {
		for (let i = 0; i < file.length; i++) {
			let upload = request
				.post(process.env.REACT_APP_UPLOAD_URL)
				.field('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
				.field('file', file[i]);

			upload.end((err, response) => {
				if (err) {
					console.error(err);
				}

				if (response.body.secure_url !== '') {
					console.log(response.body.secure_url);
					this.setState({
						uploadedFileCloudinaryUrl: [ ...this.state.uploadedFileCloudinaryUrl, response.body.secure_url ]
					});
				}
			});
		}
	}

	upload() {
		let test = {
			images: this.state.uploadedFileCloudinaryUrl,
			listing_id: 38
		};
		axios.put('/api/updateImages', test).then((res) => {
			console.log(res);
			if (res.data === 'Added') {
				this.setState({
					uploadedFileCloudinaryUrl: []
				});
			}
		});

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

	handleKeyPressPro = (e) => {
		let newPros = this.state.pros;
		newPros.push(this.state.prosInput);
		this.setState({
			pros: newPros
		});
	};

	handleKeyPressCon = (e) => {
		let newCons = this.state.cons;
		newCons.push(this.state.consInput);
		this.setState({
			cons: newCons
		});
	};

	deletePro = (i) => {
		console.log(i);
		let newPros = this.state.pros;
		newPros.splice(i, 1);
		this.setState({
			pros: newPros,
			prosInput: ''
		});
	};

	deleteCon = (i) => {
		console.log(i);
		let newCons = this.state.cons;
		newCons.splice(i, 1);
		this.setState({
			cons: newCons,
			consInput: ''
		});
	};

	render() {
		let mappedImages = this.state.uploadedFileCloudinaryUrl.map((image, i) => {
			return (
				<div key={i}>
					<img src={image} alt="" />
				</div>
			);
		});

		let pros = this.state.pros.map((elem, i) => {
			return (
				<div key={i} className="ProAndCon">
					<h3>{elem}</h3>
					<IconButton
						aria-label="Delete"
						onClick={() => {
							this.deletePro(i);
						}}>
						<DeleteIcon />
					</IconButton>
				</div>
			);
		});
		let cons = this.state.cons.map((elem, i) => {
			return (
				<div key={i} className="ProAndCon">
					<h3>{elem}</h3>
					<IconButton
						aria-label="Delete"
						onClick={() => {
							this.deleteCon(i);
						}}>
						<DeleteIcon />
					</IconButton>
				</div>
			);
		});
		return (
			<div>
				<h1 className="AddListingHeading">Create Listing</h1>

				<div className="AddListingContainer">
					<Paper className="halfFirst">
						<h1>Add Image</h1>
						<div className="PictureUploadContainer">
							<div className="test">
								<Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop.bind(this)}>
									<p>Drop an image or click to select a file to upload.</p>
								</Dropzone>
							</div>
							<div>{this.state.uploadedFileCloudinaryUrl === '' ? null : mappedImages}</div>
							<button onClick={() => this.upload()}>Upload</button>
						</div>
					</Paper>
					<Paper className="halfSecond">
						<h3>Description</h3>
						<TextField
							/* id="multiline-static" */
							label="Description"
							multiline
							/* rows="4" */
							/* defaultValue="Default Value" */
							/* className={} */
							margin="normal"
							style={{ width: '90%', height: '90%' }}
						/>
					</Paper>
					<Paper className="FullRow">
						<h3>Description</h3>
						<TextField
							/* id="multiline-static" */
							label="Description"
							multiline
							/* rows="4" */
							/* defaultValue="Default Value" */
							/* className={} */
							margin="normal"
							style={{ width: '90%', height: '90%' }}
						/>
					</Paper>
					<Paper className="halfFirst">
						<div>
							<h3>Pros</h3>
							<div className="InputandButton">
								<TextField
									label="Type Pros Here"
									multiline
									margin="normal"
									style={{ width: '90%', height: '90%' }}
									onChange={(e) => {
										this.setState({
											prosInput: e.target.value
										});
									}}
								/>
								<Button
									color="primary"
									raised
									dense
									className="buttonAdd"
									onClick={this.handleKeyPressPro}>
									Add
								</Button>
							</div>
							<div>{pros}</div>
						</div>
					</Paper>
					<Paper className="halfSecond">
						<h3>Cons</h3>
						<div className="InputandButton">
							<TextField
								label="Type Pros Here"
								multiline
								margin="normal"
								style={{ width: '90%', height: '90%' }}
								onChange={(e) => {
									this.setState({
										consInput: e.target.value
									});
								}}
							/>
							<Button color="primary" raised dense className="buttonAdd" onClick={this.handleKeyPressCon}>
								Add
							</Button>
						</div>
						<div>{cons}</div>
					</Paper>
				</div>
			</div>
		);
	}
}

export default AddListing;
