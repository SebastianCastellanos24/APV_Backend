import jwt from "jsonwebtoken";

const genearJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

export default genearJWT