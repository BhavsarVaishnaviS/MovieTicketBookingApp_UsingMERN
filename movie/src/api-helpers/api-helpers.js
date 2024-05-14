import axios from "axios";

export const getAllMovies = async () => {
    try {
        const res = await axios.get("/movie");
        if (res.status !== 200) {
            console.log("No Data");
            return;
        }
        const data = await res.data;
        return data;
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

        const resData = await res.data;
        return resData;
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

        const resData = await res.data;
        return resData;
    } catch (err) {
        console.log(err);
    }
};

export const getMovieDetails = async (id) => {
    try {
        const res = await axios.get(`/movie/${id}`);
        if (res.status !== 200) {
            console.log("Unexpected Error");
            return;
        }
        const resData = await res.data;
        return resData;
    } catch (err) {
        console.log(err);
    }
};

export const newBooking = async(data)=>{
    const res= await axios.post('/booking',{
        movie: data.movie,
        setNumber:data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

    if(res.status !== 201){
        return console.log("Unexpected Error");
    }

    const resData = await res.data;
    return resData;
}

export const getUserBooking = async()=>{
    const id = localStorage.getItem("userId")
    const res = await axios
    .get('/user/bookings/${id}')
    .catch((err)=>console.log(err));
    
    if(res.status !== 200){
        return console.lo