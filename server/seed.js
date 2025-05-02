const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProduct,
    createUserProduct,
    fetchUserProduct,
    destroyUserProduct,
  } = require("./db");

  const seed = async () => {
    await client.connect();
  
    await createTables();
    console.log("tables created");
  
    const [Scott, Herb, Mike, Bill, GolfCart, Razor, DuneBuggy] = await Promise.all([
      createUser("Scott", "abc123",true, "Scott Aishe", "saaishe@gmail.com", "337 Muskegon BLVD", "","",),
      createUser("Herb", "somePassword",true, "Herb Baushke", "herb@gmail.com", "HB AVE", "","",),
      createUser("Mike", "123456",true, "Mike Hrushake", "mike@gmail.com", "MH BLVD", "","",),
      createUser("Bill", "654321",true, "Bill Miklosivic", "bill@aol.com", "BM Lane", "","",),
      createProduct("GolfCart"),
      createProduct("Razor"),
      createProduct("DuneBuggy"),
    ]);
  
    console.log("users created");
    console.log(await fetchUsers());
  
    console.log("Products created");
    console.log(await fetchUserProduct());
  
    const [User_Products] = await Promise.all([
      createUserProduct(Scott.id, GolfCart.id),
      createUserProduct(Herb.id, Razor.id),
      createUserProduct(Mike.id, DuneBuggy.id),
      createUserProduct(Bill.id, GolfCart.id),
    ]);
  
    console.log("User Products created");
    console.log(await fetchProduct(Scott.id));
  
    await destroyUserProduct(User_Products.id, Scott.id);
  
    console.log("after deleting product");
    console.log(await fetchUserProduct(Scott.id));
  
    await client.end();
  };
  
  seed();