import bookControllers from "@/controllers/bookControllers";
import { Router } from "express";

const bookRoutes = Router()

bookRoutes.post("/",bookControllers.create)

export default bookRoutes;
