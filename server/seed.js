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
      createProduct("GolfCart","https://media.istockphoto.com/id/2166147190/photo/golf-cart-against-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=rdiv4qWsVtnhaERAIZUPRmyJY6uumPLgF1-tb4zeeJ4=",50,1),
      createProduct("Razor","https://media.istockphoto.com/id/1988307891/photo/atv-and-utv-offroad-vehicle-racing-in-sand-dunes-extreme-adrenalin-4x4.webp?a=1&b=1&s=612x612&w=0&k=20&c=dsk2uBc4o6f5gA-0odUsNLn57vN7tqKNxEmrr8wwBL0=",100,2),
      createProduct("DuneBuggy","https://media.istockphoto.com/id/538324315/photo/blue-dune-buggy.webp?a=1&b=1&s=612x612&w=0&k=20&c=Go2dRuPLrgSEQvVT3vPG95oeAVZ9-M56doTzUGzVpzk=",75,4),
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