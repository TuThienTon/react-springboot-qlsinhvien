import { Grid } from "@mui/material";
import React from "react";
import IconRequiredLabel from "./IconRequiredLabel";

function InputFieldRaw(props: any) {
  let { name, label, placeholder, tooltip, isRequired, ...rest } = props;
	return (
		<div className="form-group">
			<Grid container direction="row">
				<Grid item textAlign="left">
					{label && (
						<label htmlFor={name}>
							{label} <IconRequiredLabel show={isRequired} /> {tooltip}
						</label>
					)}
				</Grid>
        <input {...props} className="form-control" />
			</Grid>
		</div>
	);
}

export default InputFieldRaw;
