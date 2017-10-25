import React, { Component } from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

export default class categoriesBar extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="categories">
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Categories</p>
                <div className="electronics_checkbox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checkedA}
                                onChange={this.props.handleChangeInput('checkedA')}
                                value={'Electronics'}
                            />
                        }
                        label="Electronics"
                    />
                </div>
                <div className="home_checkbox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checkedB}
                                onChange={this.props.handleChangeInput('checkedB')}
                                value={'Home'}
                            />
                        }
                        label="Home"
                    />
                </div>
                <div className="sports_checkbox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checkedC}
                                onChange={this.props.handleChangeInput('checkedC')}
                                value={'Sports'}
                            />
                        }
                        label="Sports"
                    />
                </div>

                <div className="parts_checkbox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checkedD}
                                onChange={this.props.handleChangeInput('checkedD')}
                                value={'Parts'}
                            />
                        }
                        label="Parts"
                    />
                </div>

                <div className="free_checkbox">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checkedE}
                                onChange={this.props.handleChangeInput('checkedE')}
                                value={'Free'}
                            />
                        }
                        label="Free"
                    />
                </div>
            </div>
        );
    }
}
