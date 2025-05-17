const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProduct,
    createUserProduct,
    fetchUserProducts,
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
      createProduct("Quad","https://images.unsplash.com/photo-1619708707036-b21b46d05221?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhZCUyMGF0dnxlbnwwfHwwfHx8MA%3D%3D",65,6),
      createProduct("Dirt Bike","https://media.istockphoto.com/id/1097446772/photo/red-racing-motorcycle-for-motocross-by-side-view.jpg?s=612x612&w=0&k=20&c=Ll5xe9mAvDAJIH2FoMDvqA6uM2CW_PsdS18E2mxtv5E=",65,4),
      createProduct("electric scooter","https://media.istockphoto.com/id/2152111709/photo/photo-of-electric-push-scooter-outdoors-in-the-parking-photography-with-powerful-kikscooter.jpg?s=612x612&w=0&k=20&c=XGqEOM8-s2yjtJ6Z0DF5ajY6LhlwFKLoeEfp-uMpwhE=",25,15),
      createProduct("SlingShot","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRyyMieBGkqHcim_pffr49miy89h1KzUzdgLh6qXibqyDnXpKzb6qnIFW_OKEdB6zNDoORrBTXrLwNzMB5AasP1v15XI7pHDq1SYlHJ8x4jAz7GtbEC1yZ-pA",125,0),
      createProduct("Electric Bike","https://images.unsplash.com/photo-1619678786641-23eb19f27924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGVsZWN0cmljJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D",35,10),
      ]);
  
    console.log("users created");
    console.log(await fetchUsers());
  
    console.log("Products created");
    console.log(await fetchUserProducts());
  
    const [User_Products] = await Promise.all([
      createUserProduct(Scott.id, GolfCart.id, 1),
      createUserProduct(Herb.id, Razor.id, 2),
      createUserProduct(Mike.id, DuneBuggy.id, 6),
     createUserProduct(Bill.id, GolfCart.id, 1),
    ]);
  
    console.log("User Products created");
   // console.log(await fetchProduct(Scott.id));
  
   // await destroyUserProduct(User_Products.id, Scott.id);
  
    console.log("after deleting product");
    console.log(await fetchUserProducts(Scott.id));
  
    await client.end();
  };
  
  seed();