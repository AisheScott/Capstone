const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

require("dotenv").config();
const {
    client,
    createUser,
    destroyUser,
    fetchUsers,
    fetchUser,
    createProduct,
    modifyProduct,
    destroyProduct,
    fetchProducts,
    fetchAvailableProducts,
    fetchProduct,
    createUserProduct,
    fetchUserProducts,
    destroyUserProduct,
    subtractUserProductQuantity,
    addUserProductQuantity,
    authenticate,
    findUserByToken,
    signToken,
  } = require("./db");

  const server = express();
  server.use(cors());
  client.connect();
  
  server.use(express.json());
  server.use(morgan("dev"));
  
  server.use(async (req, res, next) => {
    try {
      const token = req.header("Authorization");
  
      if (token) {
        const user = await findUserByToken(token);
  
        if (!user || !user.id) {
          next({
            name: "Authorization Header Error",
            message: "Authorization token malformed",
          });
          return;
        } else {
          req.user = user;
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`server listening on port ${port}`));
  
  server.post("/api/auth/register", async (req, res, next) => {
    try {
      const user = await createUser(
        req.body?.username,
        req.body?.password,
        req.body.is_admin,
        req.body.name,
        req.body.email_address,
        req.body.mailing_address,
        req.body.phone_number,
        req.body.billing_address
      );
      const token = await signToken(user.id);
      res.status(201).send({ token });
    } catch (error) {
      next(error);
    }
  });
  
  server.post("/api/auth/login", async (req, res, next) => {
    try {
      const user = await authenticate(req.body?.username, req.body?.password);
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
      const token = await signToken(user.id);
      res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  });
  
  server.delete("/api/user", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      await destroyUser(req.user.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/users", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      if (req.user.is_admin != true) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const users = await fetchUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/users/me", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      const users = await fetchUser(req.user.id);
      res.send(users);
    } catch (error) {
      next(error);
    }
  });
  
  server.post("/api/product", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      if (req.user.is_admin != true) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const product = await createProduct(
        req.body.description,
        req.body.img_url,
        req.body.price,
        req.body.quantity_available
      );
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.patch("/api/product/:id", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      if (req.user.is_admin != true) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const product = await modifyProduct(
        req.params.id,
        req.body.description,
        req.body.img_url,
        req.body.price,
        req.body.quantity_available
      );
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.delete("/api/product/:id", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      if (req.user.is_admin != true) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      await destroyProduct(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/products/all", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      if (req.user.is_admin != true) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      const products = await fetchProducts();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/products/available", async (req, res, next) => {
    try {
      const products = await fetchAvailableProducts();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/product/:id", async (req, res, next) => {
    try {
      const product = await fetchProduct(req.params.id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.post("/api/user/userProduct", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      const product = await createUserProduct(
        req.user.id,
        req.body.product_id,
        req.body.quantity
      );
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.get("/api/user/userProducts", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      const userProducts = await fetchUserProducts(req.user.id);
      res.send(userProducts);
    } catch (error) {
      next(error);
    }
  });
  
  server.delete("/api/user/userProduct/:id", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      await destroyUserProduct(req.params.id, req.user.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
  
  server.patch("/api/user/userProduct/subtract/:id", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      const product = await subtractUserProductQuantity(
        req.params.id,
        req.user.id,
        req.body.quantity
      );
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.patch("/api/user/userProduct/add/:id", async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send({ message: "Login Required" });
      }
      const product = await addUserProductQuantity(
        req.params.id,
        req.user.id,
        req.body.quantity
      );
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message || err });
  });