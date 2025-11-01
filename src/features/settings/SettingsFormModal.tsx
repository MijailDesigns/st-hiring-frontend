import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SettingsForm from "./SettingsForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsFormModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle variant="h4">Update Settings</DialogTitle>
      <DialogContent>
        <SettingsForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
