import { FieldArray, Field, useFormikContext, FieldProps } from "formik";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { DeliveryMethod } from "../../interfaces/setting.interface";

interface FormValues {
  data: {
    deliveryMethods: DeliveryMethod[];
  };
}

export default function DeliveryMethodsField() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const methods = values.data.deliveryMethods;

  const setDefault = (index: number) => {
    methods.forEach((_: DeliveryMethod, i: number) => {
      setFieldValue(`data.deliveryMethods.${i}.isDefault`, i === index);
    });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Typography variant="h6">Delivery Methods</Typography>

      <FieldArray name="data.deliveryMethods">
        {({ remove, push }) => (
          <>
            {methods.map((method: DeliveryMethod, index: number) => (
              <Grid
                container
                spacing={1}
                key={index}
                alignItems="center"
                style={{ marginBottom: 8 }}
              >
                {/* NAME */}
                <Grid item xs={3}>
                  <Field name={`data.deliveryMethods.${index}.name`}>
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Name"
                      />
                    )}
                  </Field>
                </Grid>

                {/* ENUM */}
                <Grid item xs={3}>
                  <Field name={`data.deliveryMethods.${index}.enum`}>
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Enum"
                      />
                    )}
                  </Field>
                </Grid>

                {/* ORDER */}
                <Grid item xs={2}>
                  <Field name={`data.deliveryMethods.${index}.order`}>
                    {({ field, form }: FieldProps) => (
                      <TextField
                        {...field}
                        type="number"
                        size="small"
                        label="Order"
                        onChange={(e) =>
                          form.setFieldValue(field.name, Number(e.target.value))
                        }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>

                {/* IS DEFAULT */}
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(method.isDefault)}
                        onChange={() => setDefault(index)}
                      />
                    }
                    label="Default"
                  />
                </Grid>

                {/* SELECTED */}
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Field name={`data.deliveryMethods.${index}.selected`}>
                        {({ field }: FieldProps) => (
                          <Checkbox
                            checked={Boolean(field.value)}
                            onChange={(e) =>
                              setFieldValue(field.name, e.target.checked)
                            }
                          />
                        )}
                      </Field>
                    }
                    label="On"
                  />
                </Grid>

                {/* REMOVE */}
                <Grid item xs={1}>
                  <Button color="error" onClick={() => remove(index)}>
                    X
                  </Button>
                </Grid>
              </Grid>
            ))}

            {/* ADD NEW */}
            <Button
              variant="outlined"
              onClick={() =>
                push({
                  name: "",
                  enum: "",
                  order: methods.length + 1,
                  isDefault: false,
                  selected: true,
                })
              }
            >
              + Add Delivery Method
            </Button>
          </>
        )}
      </FieldArray>
    </div>
  );
}
