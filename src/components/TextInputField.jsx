import React from "react";
import { TextField, Typography } from "@mui/material";
import { useField } from "formik";

const TextInputField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  var name = props.name;
  // if(meta.error){
  //   isetSu
  // }
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "5px", marginTop: "10px" }}>
        <label>
          {props.label}
          <span style={{ color: "red" }}>{props.isRequired ? "*" : ""}</span>
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
         disabled={props.disabled}
          type={props.type}
          multiline={props.multiline}
          placeholder={props.placeholder}
          {...field}
          //helperText={errorText}
          InputProps={{
            inputProps: { min: 0 },
          }}
          error={!!errorText}
          variant={props.variant ? props.variant : "outlined"}
          fullWidth
          sx={{
            input: {
              height: "2px",
            },
          }}
        />
        <Typography sx={{ color: "tomato" }} variant="caption">
          {errorText}
        </Typography>
      </div>
    </div>
  );
};
export default TextInputField;
