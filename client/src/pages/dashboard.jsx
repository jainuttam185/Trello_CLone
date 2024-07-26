import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";


const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [allWrkSpaces, setAllWrkSpaces] = useState([]);

  const handleNewWrkSpace = async () => {
    const res = await fetch("https://trello-clone-9ydq.onrender.com/workspace/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wrkSpaceName: name }),
    });
    const { data, status } = await res.json();

    const res2 = await fetch("https://trello-clone-9ydq.onrender.com/workspace/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id, wrkSpaceId: data.workspace._id }),
    });

    if (res.status === 201 && res2.status == 200) {
      message.success("success");
    } else {
      message.error("Registration failed");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://trello-clone-9ydq.onrender.com/trello/refresh", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const { data, status } = await res.json();
      console.log(data.user._id);
      setId(data.user._id);
      if (res.status === 200) {
        message.success("success");
        console.log(data);
        //login(data.token,data.user);
      } else {
        message.error("Registration failed");
      }
      const res2 = await fetch(
        `https://trello-clone-9ydq.onrender.com/workspace/${data.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await res2.json();
      console.log(data2);
      setAllWrkSpaces(data2.data.user.wrkSpaces);
    }
    fetchData();
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={11}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Readex Pro",
              fontSize: "40px",
              fontWeight: "500",
              lineHeight: "77px",
              textAlign: "center",
              mt: "50px",
              mb: "50px",
            }}
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={6} md={1} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
         
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
          
        </Grid>
      </Grid>
      
      <Button variant="contained" onClick={handleClickOpen} sx={{ml:2,mb:6
      }}>
       + Create a Workspace
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>CREATE A NEW WORKSPACE</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="WORKSPACE NAME"
            label="WORKSPACE NAME"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleNewWrkSpace}>
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ ml:2}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {allWrkSpaces.map((item) => (
        <Grid item xs={3}>
        <Card sx={{ maxWidth: 345, boxShadow: 4,
          borderRadius: 2.5 }}>
          <CardContent sx={{display:"flex", justifyContent:"center"}}>
          <Typography variant="h5" component="div" sx={{fontFamily: "Readex Pro",}}>
          {item.name}
        </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }} >
        <Button
          key={item._id}
          variant="outlined"
          onClick={() => navigate(`/trelloboard/${item._id}`)}
          sx={{width:"345px"}}
        >
          OPEN
        </Button>
        </CardActions>
        </Card>
        </Grid>
      ))}
      </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
