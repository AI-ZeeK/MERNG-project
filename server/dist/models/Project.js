import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
});
const ProjectSchema = mongoose.model("Project", projectSchema);
export default ProjectSchema;
