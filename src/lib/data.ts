export const restaurants = [
  {
    id: "spice-kitchen",
    name: "Spice Kitchen",
    meta: "North Indian • 25 min • ₹250 for one",
    rating: 4.5,
    deliveryFee: 39,
    image:
      "https://images.pexels.com/photos/6151203/pexels-photo-6151203.jpeg?auto=compress&cs=tinysrgb&w=1200",
    carousel: [
      "https://images.pexels.com/photos/6151203/pexels-photo-6151203.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    cuisines: ["North Indian", "Biryani", "Tandoor"],
    menu: [
      {
        id: "butter-chicken",
        title: "Butter Chicken",
        description: "Creamy tomato-based curry with tender roasted chicken.",
        price: 349,
        serving: "Serves 1-2",
        isVeg: false,
        image:
          "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "paneer-tikka",

        title: "Paneer Tikka",

        description: "Char-grilled cottage cheese cubes with Indian spices.",

        price: 289,

        serving: "6 pieces",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "veg-biryani",

        title: "Veg Dum Biryani",

        description: "Slow-cooked aromatic basmati rice with vegetables.",

        price: 259,

        serving: "Serves 1",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/12737811/pexels-photo-12737811.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "green-bowl",

    name: "Green Bowl",

    meta: "Healthy Bowls • 18 min • ₹200 for one",

    rating: 4.7,

    deliveryFee: 19,

    image:
      "https://images.pexels.com/photos/34407496/pexels-photo-34407496.jpeg?auto=compress&cs=tinysrgb&w=1200",

    carousel: [
      "https://images.pexels.com/photos/34407496/pexels-photo-34407496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],

    cuisines: ["Healthy", "Salads", "Protein Bowls"],

    menu: [
      {
        id: "mexican-bowl",

        title: "Mexican Protein Bowl",

        description: "Rice, beans, avocado, grilled chicken, and salsa.",

        price: 329,

        serving: "Serves 1",

        isVeg: false,

        image:
          "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "green-salad",

        title: "Green Detox Salad",

        description: "Fresh greens, cucumber, broccoli, and citrus dressing.",

        price: 249,

        serving: "Serves 1",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "smoothie-bowl",

        title: "Berry Smoothie Bowl",

        description: "Mixed berries, granola, banana, and chia seeds.",

        price: 219,

        serving: "Serves 1",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "urban-pizza",

    name: "Urban Pizza",

    meta: "Pizza & Sides • 30 min • ₹300 for one",

    rating: 4.3,

    deliveryFee: 49,

    image:
      "https://images.pexels.com/photos/19264274/pexels-photo-19264274.jpeg?auto=compress&cs=tinysrgb&w=1200",

    carousel: [
      "https://images.pexels.com/photos/19264274/pexels-photo-19264274.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],

    cuisines: ["Pizza", "Italian", "Fast Food"],

    menu: [
      {
        id: "margherita",

        title: "Margherita Pizza",

        description: "Classic mozzarella pizza with basil and tomato sauce.",

        price: 299,

        serving: "Medium • 4 slices",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "farmhouse",

        title: "Farmhouse Pizza",

        description: "Loaded with onions, capsicum, mushrooms, and olives.",

        price: 399,

        serving: "Medium • 6 slices",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800",
      },

      {
        id: "garlic-bread",

        title: "Cheesy Garlic Bread",

        description: "Toasted garlic bread stuffed with mozzarella cheese.",

        price: 179,

        serving: "4 pieces",

        isVeg: true,

        image:
          "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "sushi-paradise",
    name: "Sushi Paradise",
    meta: "Japanese • 20 min • ₹350 for one",
    rating: 4.6,
    deliveryFee: 35,
    image: "https://images.pexels.com/photos/37260671/pexels-photo-37260671.jpeg",
    carousel: [
      "https://images.pexels.com/photos/3963857/pexels-photo-3963857.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5732446/pexels-photo-5732446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/8666919/pexels-photo-8666919.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    cuisines: ["Japanese", "Sushi", "Seafood"],
    menu: [
      {
        id: "california-roll",
        title: "California Roll",
        description: "Crab, avocado, and cucumber with sesame seeds.",
        price: 299,
        serving: "8 pieces",
        isVeg: false,
        image:
          "https://images.pexels.com/photos/5732446/pexels-photo-5732446.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "vegetable-roll",
        title: "Vegetable Roll",
        description: "Fresh cucumber, avocado, and pickled radish.",
        price: 199,
        serving: "8 pieces",
        isVeg: true,
        image:
          "https://images.pexels.com/photos/8666919/pexels-photo-8666919.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "burger-joint",
    name: "Burger Joint",
    meta: "Burgers & Shakes • 15 min • ₹200 for one",
    rating: 4.4,
    deliveryFee: 25,
    image:
      "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=1200",
    carousel: [
      "https://images.pexels.com/photos/5632633/pexels-photo-5632633.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    cuisines: ["Burgers", "Fast Food", "Shakes"],
    menu: [
      {
        id: "beef-burger",
        title: "Classic Beef Burger",
        description: "Juicy beef patty with lettuce, tomato, and special sauce.",
        price: 249,
        serving: "1 burger",
        isVeg: false,
        image:
          "https://images.pexels.com/photos/5632633/pexels-photo-5632633.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "veggie-burger",
        title: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables.",
        price: 199,
        serving: "1 burger",
        isVeg: true,
        image:
          "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "taco-fiesta",
    name: "Taco Fiesta",
    meta: "Mexican • 22 min • ₹180 for one",
    rating: 4.5,
    deliveryFee: 29,
    image:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
    carousel: [
      "https://images.pexels.com/photos/5949122/pexels-photo-5949122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    cuisines: ["Mexican", "Tacos", "Street Food"],
    menu: [
      {
        id: "chicken-tacos",
        title: "Chicken Tacos",
        description: "Grilled chicken with cilantro, onion, and lime.",
        price: 179,
        serving: "3 tacos",
        isVeg: false,
        image:
          "https://images.pexels.com/photos/5949122/pexels-photo-5949122.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "bean-tacos",
        title: "Bean & Cheese Tacos",
        description: "Refried beans with melted cheese and salsa.",
        price: 149,
        serving: "3 tacos",
        isVeg: true,
        image:
          "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
  {
    id: "dessert-heaven",
    name: "Dessert Heaven",
    meta: "Desserts & Pastries • 10 min • ₹150 for one",
    rating: 4.8,
    deliveryFee: 15,
    image:
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200",
    carousel: [
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2827486/pexels-photo-2827486.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5632633/pexels-photo-5632633.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    cuisines: ["Desserts", "Pastries", "Cakes"],
    menu: [
      {
        id: "chocolate-cake",
        title: "Chocolate Cake",
        description: "Rich chocolate cake with creamy frosting.",
        price: 199,
        serving: "1 slice",
        isVeg: true,
        image:
          "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: "cheesecake",
        title: "Cheesecake",
        description: "Creamy New York style cheesecake.",
        price: 249,
        serving: "1 slice",
        isVeg: true,
        image:
          "https://images.pexels.com/photos/2827486/pexels-photo-2827486.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },
];

export type RestaurantsType = (typeof restaurants)[number];
