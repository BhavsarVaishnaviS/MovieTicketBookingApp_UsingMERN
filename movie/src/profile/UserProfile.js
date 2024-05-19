import React, { Fragment, useEffect, useState } from "react";
// import { deleteBooking, getUserBooking, getUserDetails } from "api-helpers/api-helpers";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBooking, getUserBooking, getUserDetails } from "../api-helpers/api-helpers";

const UserProfile = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      getUserBooking()
        .then((res) => setBookings(res.bookings))
        .catch((err) => console.log(err));
  
      getUserDetails()
        .then((res) => setUser(res.user))
        .catch((err) => console.log(err));
    }, []);
  
    const handleDelete = (id) => {
      deleteBooking(id)
        .then((res) => {
          console.log(res);
          // Update the bookings state to remove the deleted booking
          setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== id));
        })
        .catch((err) => console.log(err));
    };
  
    return (
      <Box width={"100%"} display="flex">
        {bookings.length > 0 && (
          <Fragment>
            {user && (
              <Box
                width="30%"
                flexDirection={"column"}
                justifyContent="center"
                alignItems={"center"}
                padding={3}
              >
                <AccountCircleIcon
                  sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
                />
                <Typography
                  padding={1}
                  width={"auto"}
                  textAlign={"center"}
                  border={"1px solid #ccc"}
                  borderRadius={6}
                >
                  Name: {user.name}
                </Typography>
                <Typography
                  mt={1}
                  padding={1}
                  width={"auto"}
                  textAlign={"center"}
                  border={"1px solid #ccc"}
                  borderRadius={6}
                >
                  Email: {user.email}
                </Typography>
              </Box>
            )}
            <Box width={"70%"} display="flex" flexDirection={"column"}>
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign={"center"}
                padding={2}
              >
                Bookings
              </Typography>
              <Box
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                width={"80%"}
              >
                <List>
                  {bookings.map((booking) => (
                    <ListItem
                      key={booking._id}
                      sx={{
                        bgcolor: "#00d386",
                        color: "white",
                        textAlign: "center",
                        margin: 1,
                      }}
                    >
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Movie: {booking.movie.title}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Seat: {booking.seatNumber}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Date: {new Date(booking.releaseDate).toDateString()}
                      </ListItemText>
                      <IconButton
                        onClick={() => handleDelete(booking._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Fragment>
        )}
      </Box>
    );
  };

export default UserProfile;

