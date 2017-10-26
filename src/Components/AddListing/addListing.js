import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import './addListing.css';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { getUserInfo } from '../../Redux/reducer';
import { connect } from 'react-redux';
import States from './StatesInput';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class AddListing extends Component {
	constructor() {
		super();
		this.state = {
			uploadedFileCloudinaryUrl: [],
			uploadedFile: [],
			pros: [],
			cons: [],
			prosInput: '',
			consInput: '',
			textmask: '',
			numberformat: '1320',
			price: '',
			category: '',
			description: '',
			user_id: '',
			auth_id: '',
			title: '',
			state: '',
			city: '',
			zip: '',
			checkedA: false,
			checkedB: false,
		};
	}

	componentDidMount() {
		this.props.getUserInfo();
		if (this.props.user) {
			this.setState({
				user_id: this.props.user.user_id,
				auth_id: this.props.user.auth_id
			})
		}
	}

	handleCreate = () => {
		let listingObj = {
			price: this.state.price,
			category: this.state.category,
			description: this.state.description,
			phone_number: this.formatPhoneNumber(this.state.textmask),
			pros: this.state.pros.toString(),
			cons: this.state.cons.toString(),
			user_id: this.state.user_id,
			auth_id: this.state.auth_id,
			title: this.state.title,
			images: this.state.uploadedFileCloudinaryUrl,
			state: this.state.state,
			city: this.state.city,
			time_submitted: Date(),
			contact_status: (this.state.checkedA && this.state.checkedB) ? 'Call and Text' : (this.state.checkedA) ? 'Call Only' : 'Text Only',
			zip: this.state.zip
		}
		axios.post('http://localhost:3060/api/addListing', listingObj).then((res) => {
			if (res.status === 200) {
				alert('Listing has been created');
				this.props.history.push('/');
			}
		});
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
				}

				if (response.body.secure_url !== '') {
					this.setState({
						uploadedFileCloudinaryUrl: [...this.state.uploadedFileCloudinaryUrl, response.body.secure_url]
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
			if (res.data === 'Added') {
				this.setState({
					uploadedFileCloudinaryUrl: []
				});
			}
		});
	}

	handleKeyPressPro = (e) => {
		let newPros = this.state.pros;
		newPros.push(this.state.prosInput);
		this.setState({
			pros: newPros,
			prosInput: ''
		});
	};

	handleKeyPressCon = (e) => {
		let newCons = this.state.cons;
		newCons.push(this.state.consInput);
		this.setState({
			cons: newCons,
			consInput: ''
		});
	};

	deletePro = (i) => {
		let newPros = this.state.pros;
		newPros.splice(i, 1);
		this.setState({
			pros: newPros,
			prosInput: ''
		});
	};

	deleteCon = (i) => {
		let newCons = this.state.cons;
		newCons.splice(i, 1);
		this.setState({
			cons: newCons,
			consInput: ''
		});
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleInputCategory = name => event => {
		this.setState({ [name]: event.target.value });
	};

	changePrice = (price) => {
		if (isNaN(price)) {
			alert('Must be a number');

		}
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			// the default value for minimumFractionDigits depends on the currency
			// and is usually already 2
		});
		let formatedPrice = formatter.format(price)
		this.setState({
			price: formatedPrice
		})
	}

	updateCategory = (category) => {
		this.setState({
			category: category
		})
	}

	handleDescription = (description) => {
		this.setState({
			description: description
		})
	}

	handleTitle = (title) => {
		this.setState({
			title: title
		})
	}

	getStateInput = (state) => {
		this.setState({
			state: state
		})
	}

	handleCity = (city) => {
		this.setState({
			city: city
		})
	}

	handleZip = (zip) => {
		this.setState({
			zip: zip
		})
	}

	handleCheck = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	formatPhoneNumber = (textmask) => {
		if (textmask.length === 10 || textmask.length === 12) {
			let phoneNumber = textmask.replace(/[^0-9]/g, '')
			return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
		} else if (textmask.length === 11 || textmask.length === 14) {
			let phoneNumber = textmask.replace(/[^0-9]/g, '')
			return phoneNumber.replace(/^1?([2-9]..)([2-9]..)(....)$/, "1-$1-$2-$3")
		}
	}

	render() {
		let mappedImages = this.state.uploadedFileCloudinaryUrl.map((image, i) => {
			return (
				<div key={i}>
					<img src={image} alt="" className="uploadedImage" />
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
				<div className="categoryButtons">
					<Button raised className={(this.state.category === 'Electronics') ? 'createListing_Electronics_Clicked' : 'createListing_Electronics'} onClick={() => { this.updateCategory('Electronics') }}>
						Electronics
     				</Button>
					<Button raised className={(this.state.category === 'Home') ? 'createListing_Home_Clicked' : 'createListing_Home'} onClick={() => { this.updateCategory('Home') }}>
						Home
     				</Button>
					<Button raised className={(this.state.category === 'Sports') ? 'createListing_Sports_Clicked' : 'createListing_Sports'} onClick={() => { this.updateCategory('Sports') }}>
						Sports
     				</Button>
					<Button raised className={(this.state.category === 'Parts') ? 'createListing_Parts_Clicked' : 'createListing_Parts'} onClick={() => { this.updateCategory('Parts') }}>
						Parts
     				</Button>
					<Button raised className={(this.state.category === 'Free') ? 'createListing_Free_Clicked' : 'createListing_Free'} onClick={() => { this.updateCategory('Free') }}>
						Free
     				</Button>
				</div>

				<div className="AddListingContainer">
					<Paper className="halfFirstInput">
						<h1>Basic Info</h1>
						<FormGroup row style={(this.state.textmask) ? { display: 'block' } : { display: 'none' }}>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedA}
										onChange={this.handleCheck('checkedA')}
										value="checkedA"
									/>
								}
								label="Call"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedB}
										onChange={this.handleCheck('checkedB')}
										value="checkedB"
									/>
								}
								label="Text"
							/>
						</FormGroup>
						<div className="InputsInDiv">
							<Input
								onChange={this.handleChange('textmask')}
								inputProps={{
									'aria-label': 'Description',
								}}
								placeholder="Phone (optional)"
							/>
							<Input
								placeholder="Price"
								inputProps={{
									'aria-label': 'Description',
								}}
								onChange={(e) => { this.changePrice(e.target.value) }}
							/>
						</div>

					</Paper>
					<Paper className="halfSecondInput">
						<h1>Location</h1>

						<div className="InputsInDiv">
							<Input
								placeholder="City"
								inputProps={{
									'aria-label': 'Description',
								}}
								onChange={(e) => { this.handleCity(e.target.value) }}
							/>
							<Input
								placeholder="Zip"
								inputProps={{
									'aria-label': 'Description',
								}}
								onChange={(e) => { this.handleZip(e.target.value) }}
							/>
						</div>
						<States
							getStateInput={this.getStateInput}
						/>
					</Paper>
					<Paper className="halfFirst">
						<h1>Add Image</h1>
						<div className="PictureUploadContainer">
							<div className="dropzoneBorder">
								<Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop.bind(this)}>
									<p>Drop an image or click to select a file to upload.</p>
								</Dropzone>
							</div>
						</div>
					</Paper>
					<Paper className="halfSecond">
						<h3>Details</h3>
						<div className="Details_addListing">
							<p>Phone: {this.formatPhoneNumber(this.state.textmask)}</p>
							<p>Price: {this.state.price}</p>
							<p>Category: {this.state.category}</p>
						</div>

						<div className="mappedImages">{this.state.uploadedFileCloudinaryUrl === '' ? null : mappedImages}</div>
					</Paper>
					<Paper className="FullRow">
						<h3>Description</h3>
						<TextField
							label="Title"
							multiline
							margin="normal"
							style={{ width: '45%', height: '90%' }}
							onChange={(e) => { this.handleTitle(e.target.value) }}
						/>
						<TextField
							label="Description"
							multiline
							margin="normal"
							style={{ width: '90%', height: '90%' }}
							onChange={(e) => { this.handleDescription(e.target.value) }}
						/>
					</Paper>
					<Paper className="halfFirst">
						<div>
							<h3>Pros</h3>
							<div className="InputandButton">
								<TextField
									value={this.state.prosInput}
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
									disabled={this.state.prosInput ? false : true}
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
								value={this.state.consInput}
								label="Type Cons Here"
								multiline
								margin="normal"
								style={{ width: '90%', height: '90%' }}
								onChange={(e) => {
									this.setState({
										consInput: e.target.value
									});
								}}
							/>
							<Button
								color="primary"
								raised dense className="buttonAdd"
								disabled={this.state.consInput ? false : true}
								onClick={this.handleKeyPressCon}>
								Add
							</Button>
						</div>
						<div>{cons}</div>
					</Paper>
					<Button raised className="createButton" onClick={this.handleCreate}>
						Create
      				</Button>
					<Button raised className="createButton">
						Draft
      				</Button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { getUserInfo })(AddListing);