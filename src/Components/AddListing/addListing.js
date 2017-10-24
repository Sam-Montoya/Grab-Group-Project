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
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { getUserInfo } from '../../Redux/reducer';
import { connect } from 'react-redux';
import States from './StatesInput';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';



function TextMaskCustom(props) {
	return (
		<MaskedInput
			{...props}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

function NumberFormatCustom(props) {
	return (
		<NumberFormat
			{...props}
			onChange={(event, values) => {
				props.onChange({
					target: {
						value: values.value,
					},
				});
			}}
			thousandSeparator
			prefix="$"
		/>
	);
}

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
		console.log('CLICKED')
		let listingObj = {
			price: this.state.price,
			category: this.state.category,
			description: this.state.description,
			phone_number: this.state.textmask,
			pros: this.state.pros,
			cons: this.state.cons,
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
		console.log(listingObj)
		axios.post('http://localhost:3060/api/addListing', listingObj).then((res) => {
			console.log(res)
		})
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

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleInputCategory = name => event => {
		this.setState({ [name]: event.target.value });
	};

	changePrice = (price) => {
		console.log(price)
		if (isNaN(price)) {
			alert('Must be a number')
		}
		let formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			// the default value for minimumFractionDigits depends on the currency
			// and is usually already 2
		});
		console.log(formatter.format(price))
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
		console.log(state)
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
			<div
			/* style={
				(this.state.category === 'Electronics')
					?
					{ backgroundColor: "#B3E5FC" }
					:
					(this.state.category === 'Home')
						?
						{ backgroundColor: "#E1BEE7" }
						:
						(this.state.category === 'Sports')
							?
							{ backgroundColor: "#B2DFDB" }
							:
							(this.state.category === 'Parts')
								?
								{ backgroundColor: "#EEEEEE" }
								:
								(this.state.category === "Free")
									?
									{ backgroundColor: "#FFAB91" }
									:
									{ backgroundColor: '#f5f5f5' }
			} */
			>
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



				{/* <FormControl >
					<Select
						value='bla'
						onChange={this.handleChange('age')}
						displayEmpty
					>
						<MenuItem value="test">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
					<FormHelperText>Without label</FormHelperText>
				</FormControl> */}

				<div className="AddListingContainer">
					<Paper className="halfFirstInput">
						<h1>Basic Info</h1>
						<FormGroup row style={(this.state.textmask) ? {display:'block'} : {display:'none'}}>
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
								/* value={this.state.textmask} */
								/* inputComponent={TextMaskCustom} */
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
								onChange={(e) => {this.handleCity(e.target.value)}}
							/>
							<Input
								placeholder="Zip"
								inputProps={{
									'aria-label': 'Description',
								}}
								onChange={(e) => {this.handleZip(e.target.value)}}
							/>
						</div>
						<States
								getStateInput={this.getStateInput}
							/>
					</Paper>
					<Paper className="halfFirst">
						<h1>Add Image</h1>
						<div className="PictureUploadContainer">
							<div className="test">
								<Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop.bind(this)}>
									<p>Drop an image or click to select a file to upload.</p>
								</Dropzone>
							</div>

							<Button raised onClick={() => this.upload()} className="uploadButton" style={{ backgroundColor: '#4fc3f7', color: 'white' }}>
								Upload
     						 </Button>
						</div>
					</Paper>
					<Paper className="halfSecond">
						<h3>Details</h3>
						<div className="Details_addListing">
							<p>Phone: {this.state.textmask}</p>
							<p>Price: {this.state.price}</p>
							<p>Category: {this.state.category}</p>
						</div>

						<div className="mappedImages">{this.state.uploadedFileCloudinaryUrl === '' ? null : mappedImages}</div>
					</Paper>
					<Paper className="FullRow">
						<h3>Description</h3>
						<TextField
							/* id="multiline-static" */
							label="Title"
							multiline
							/* rows="4" */
							/* defaultValue="Default Value" */
							/* className={} */
							margin="normal"
							style={{ width: '45%', height: '90%' }}
							onChange={(e) => { this.handleTitle(e.target.value) }}
						/>
						<TextField
							/* id="multiline-static" */
							label="Description"
							multiline
							/* rows="4" */
							/* defaultValue="Default Value" */
							/* className={} */
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