import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchEvents } from "./eventsSlice";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import SettingsFormModal from "../settings/SettingsFormModal";

const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading } = useSelector((state: RootState) => state.events);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Manage Settings
      </Button>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    📍 {event.location}
                  </Typography>
                  <Typography variant="subtitle2">
                    🗓 {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Tickets: {event.availableTickets.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <SettingsFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default EventsList;
