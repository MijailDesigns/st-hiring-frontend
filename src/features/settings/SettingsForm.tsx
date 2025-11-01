import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";

import { fetchSettings, updateSettings, setClientId } from "./settingsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DeliveryMethodsField from "./DeliveryMethodsField";

export default function SettingsForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { data, clientId } = useAppSelector((state) => state.settings);
  const [idInput, setIdInput] = useState("");

  useEffect(() => {
    if (clientId) dispatch(fetchSettings(clientId));
  }, [clientId, dispatch]);

  if (!clientId) {
    return (
      <div style={{ padding: "1rem" }}>
        <TextField
          fullWidth
          label="Client ID"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => dispatch(setClientId(Number(idInput)))}
        >
          Load Settings
        </Button>
      </div>
    );
  }

  if (!data) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      onSubmit={(values) => {
        const { clientId, ...rest } = values.data;
        console.log("Submitting values:", data);
        dispatch(updateSettings({ clientId, settings: rest }));
        onClose();
      }}
    >
      {({ values }) => (
        <Form style={{ padding: "1rem" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Client id: {values.data.clientId}
          </Typography>
          <Grid container spacing={2}>
            {/* Delivery methods */}

            <Grid item xs={12}>
              <DeliveryMethodsField />
            </Grid>

            {/* Fulfillment Format */}
            <Grid item xs={12}>
              <Typography variant="h6">Fulfillment Format</Typography>
              {Object.keys(values.data.fulfillmentFormat).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.fulfillmentFormat.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Printer */}

            <Grid item xs={12}>
              <Typography variant="h6">Printer</Typography>
              <Field name="data.printer.id">
                {({ field, form }: FieldProps) => (
                  <TextField
                    fullWidth
                    label="Printer ID"
                    value={field.value || ""}
                    onChange={(e) =>
                      form.setFieldValue(field.name, Number(e.target.value))
                    }
                  />
                )}
              </Field>
            </Grid>

            {/* Printing format */}

            <Grid item xs={12}>
              <Typography variant="h6">Printing format</Typography>
              {Object.keys(values.data.printingFormat).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.printingFormat.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Scanning */}

            <Grid item xs={12}>
              <Typography variant="h6">Scanning</Typography>
              {Object.keys(values.data.scanning).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.scanning.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Payment */}

            <Grid item xs={12}>
              <Typography variant="h6">Payment Methods</Typography>
              {Object.keys(values.data.paymentMethods).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.paymentMethods.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Ticket display */}

            <Grid item xs={12}>
              <Typography variant="h6">Ticket Display</Typography>
              {Object.keys(values.data.ticketDisplay).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.ticketDisplay.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Customer Info */}

            <Grid item xs={12}>
              <Typography variant="h6">Customer Info</Typography>
              {Object.keys(values.data.customerInfo).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Field name={`data.customerInfo.${key}`}>
                      {({ field, form }: FieldProps) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e.target.checked);
                          }}
                        />
                      )}
                    </Field>
                  }
                  label={key}
                />
              ))}
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Save
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={onClose}
                sx={{ mt: 1 }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
