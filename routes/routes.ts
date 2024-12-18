import express from 'express'
import ProductRouter from './products';

const Router=express.Router()
Router.use("/products",ProductRouter)
export default Router;