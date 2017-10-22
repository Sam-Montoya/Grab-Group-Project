import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

export default function categoriesBar(checkedElectronics, checkedHome, checkedSports, checkedParts, checkedFree) {
    return (
        <div className="categories">
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Categories</p>
            <div className="electronics_checkbox">
                <FormControlLabel
                    control={
                        <Checkbox
                            
                            value="checkedA"
                        />
                    }
                    label="Electronics"
                />
            </div>
            <div className="home_checkbox">
                <FormControlLabel
                    control={
                        <Checkbox
                            
                            value="checkedB"
                        />
                    }
                    label="Home"
                />
            </div>
            <div className="sports_checkbox">
                <FormControlLabel
                    control={
                        <Checkbox
                            
                            value="checkedC"
                            style={{ color: 'green' }}
                        />
                    }
                    label="Sports"
                />
            </div>

            <div className="parts_checkbox">
                <FormControlLabel
                    control={
                        <Checkbox

                            value="checkedD"
                            style={{ color: 'grey' }}
                        />
                    }
                    label="Parts"
                />
            </div>

            <div className="free_checkbox">
                <FormControlLabel
                    control={
                        <Checkbox

                            value="checkedE"
                            style={{ color: 'green' }}
                        />
                    }
                    label="Free"
                />
            </div>
        </div>
    );
}
