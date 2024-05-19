import axios from "axios";

export const getAllMovies = async () => {
    try {
        const res = await axios.get("/movie");
        if (res.status !== 200) {
            console.log("No Data");
            return;
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const sendUserAuthRequest = async (data, signup) => {
    try {
        const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password
        });

        if (res.status !== 200 && res.status !== 201) {
            console.log("Unexpected Error Occurred");
            return;
        }

        return res.data;
    } catch (err) {
        console.log(err);
    }
};



export const sendAdminAuthRequest = async (data) => {
    try {
        const res = await axios.post("/admin/login", {
            email: data.email,
            password: data.password,
        });

        if (res.status !== 200) {
            console.log("Unexpected Error");
            return;
        }

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getMovieDetails = async (id) => {
        const res = await axios.get(`/movie/${id}`)
        .catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData=await res.data;
        return resData;
};

export const newBooking = async (data) => {
    try {
        const res = await axios.post('/booking', {
            movie: data.movie,
            seatNumber: data.seatNumber,
            date: data.date,
            user: localStorage.getItem("userId"),
        });

        if (res.status !== 201) {
            return console.log("Unexpected Error");
        }

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getUserBooking = async () => {
    try {
        const id = localStorage.getItem("userId");
        const res = await axios.get(`/user/bookings/${id}`);
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteBooking = async (id) => {
    try {
        const res = await axios.delete(`/booking/${id}`);
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getUserDetails = async () => {
    try {
        const id = localStorage.getItem("userId");
        const res = await axios.get(`/user/${id}`);
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const addMovie = async (data)=>{
    const res = await axios.post("/movie",{
        title:data.title,
        description:data.description,
        releaseDate:data.releaseDate,
        posterUrl:data.posterUrl,
        featured:data.featured,
        actors:data.actors,
        admin:localStorage.getItem("adminId"),
    },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
    }).catch(err=>console.log(err))

    if(res.status !== 201){
        return console.log("Unexpected Error Occurred");
    }

    const resData = await res.data;
    return resData;
}

export const getAdminById = async()=>{
    const adminId = localStorage.getItem("adminId");
    const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("Unexpected Error Occurred");
    }

    const resData = await res.data;
    return resData;
}