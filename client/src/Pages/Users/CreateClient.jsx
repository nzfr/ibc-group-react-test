import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  // VARIABLES
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };

  // STATES
  const [clientData, setClientData] = useState(initialClientState);
  const [errors, setErrors] = useState({});

  // FUNCTIONS
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, phone, email } = clientData;

    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (!email) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(createClient(clientData, setOpen));
  };

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleClose = () => {
    if (isFetching) return; // prevent closing while submitting
    setOpen(false);
    setClientData(initialClientState);
    setErrors({});
  };

  useEffect(() => {
    if (!open) {
      setClientData(initialClientState);
      setErrors({});
    }
  }, [open]);

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="pb-4 text-lg">First Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={isFetching}
                      required
                      value={clientData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Last Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={isFetching}
                      required
                      value={clientData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">User Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={isFetching}
                      required
                      value={clientData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      error={Boolean(errors.username)}
                      helperText={errors.username}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Email </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={isFetching}
                      required
                      value={clientData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Password </td>
                  <td className="pb-4">
                    <TextField
                      type="password"
                      value={clientData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      size="small"
                      fullWidth
                      disabled={isFetching}
                      required
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Phone </td>
                  <td className="pb-4">
                    <TextField
                      type="number"
                      size="small"
                      value={clientData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                      disabled={isFetching}
                      required
                      error={Boolean(errors.phone)}
                      helperText={errors.phone}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            disabled={isFetching}
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            disabled={isFetching}
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? (
              <span className="flex items-center gap-2">
                <CircularProgress size={16} color="inherit" />
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClient;
