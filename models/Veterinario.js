import mongoose from "mongoose";
import bcrypt from "bcrypt"
import genearId from "../helpers/generarId.js"

const veterirarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: genearId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
})

veterirarioSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

veterirarioSchema.methods.comprobarPassword = async function (
    passwordFormulario
    ) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario", veterirarioSchema);
export default Veterinario;

