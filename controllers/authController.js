import Auth from "../models/AuthModel.js";


// REGISTER FUNCTION ***********************************
export const handleRegister = async (req, res) => {
       
    try {
        console.log("handleRegister", req.body);
        const auth = new Auth(req.body)
        await auth.save();
        res.status(201).send({success: true, auth})
    } catch (error) {
        console.log("error in register",error.message);
        res.status(500).send({success:false, error: error.message})
    }};


// LOGIN FUNCTION ***********************************
export const handleLogin = async (req, res) => {
        try {
    console.log("Login", req.body);
            const user = await Auth.findOne({
                username: req.body.username,
                password:req.body.password
            }).select("-password");
                console.log("UserFound", user);

        if (!user) {
            // If no user is found, send an error response
            return res.status(401).send({ success: false, error: "Username or password not correct" });
}
        // If a user is found, send a success response
            res.json({ success: true, user  });
        } catch (error) {
            console.log("error in login", error.message);
            res.status(500).send({ success: false, error: error.message });
        }
};

// GET A USER ***********************************

