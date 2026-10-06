/**
 * Full Kundeep Kitchen menu.
 *
 * NOTE: dishes and prices are SAMPLE content — replace them with the restaurant's real
 * menu and prices before launch. Prices are in Indian rupees.
 */

export type MenuTag = "bestseller" | "chef" | "spicy" | "new";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  /** Optional second price, e.g. half / full portions. */
  priceNote?: string;
  tags?: MenuTag[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
};

export const tagLabels: Record<MenuTag, string> = {
  bestseller: "Bestseller",
  chef: "Chef’s Special",
  spicy: "Spicy",
  new: "New",
};

export const menu: MenuCategory[] = [
  {
    id: "soups",
    name: "Soups",
    description: "Warm, comforting bowls to begin your meal.",
    items: [
      { name: "Tamatar Dhaniya Shorba", description: "Slow-simmered tomato broth with coriander and roasted cumin.", price: 160 },
      { name: "Sweet Corn Soup", description: "Creamy corn soup with finely chopped vegetables.", price: 170 },
      { name: "Veg Manchow Soup", description: "Hot and tangy soup topped with crispy fried noodles.", price: 180, tags: ["spicy"] },
      { name: "Lemon Coriander Soup", description: "Light, zesty clear soup with fresh herbs.", price: 170 },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    description: "From the tandoor and the kadai — perfect for sharing.",
    items: [
      { name: "Paneer Tikka", description: "Cottage cheese marinated in hung curd and spices, chargrilled in the tandoor.", price: 320, tags: ["bestseller"] },
      { name: "Malai Soya Chaap", description: "Soya chaap in a creamy cashew and cardamom marinade.", price: 300, tags: ["chef"] },
      { name: "Hara Bhara Kebab", description: "Spinach, peas and potato patties with a hint of green chilli.", price: 260 },
      { name: "Dahi ke Kebab", description: "Melt-in-the-mouth hung curd kebabs with a crisp crust.", price: 290 },
      { name: "Tandoori Mushroom", description: "Button mushrooms in a smoky tandoori masala.", price: 310 },
      { name: "Veg Seekh Kebab", description: "Minced vegetables and spices grilled on skewers.", price: 280 },
      { name: "Chilli Paneer (Dry)", description: "Crispy paneer tossed with peppers, onions and chilli sauce.", price: 300, tags: ["spicy"] },
      { name: "Crispy Corn", description: "Golden fried corn kernels tossed with salt, pepper and spring onion.", price: 250 },
      { name: "Veg Spring Rolls", description: "Crisp rolls stuffed with stir-fried vegetables, served with sweet chilli dip.", price: 240 },
    ],
  },
  {
    id: "chaat",
    name: "Chaat Corner",
    description: "Delhi’s favourite street-style bites.",
    items: [
      { name: "Aloo Tikki Chaat", description: "Crisp potato patties with chole, yoghurt and chutneys.", price: 170, tags: ["bestseller"] },
      { name: "Papdi Chaat", description: "Crunchy papdi with potatoes, yoghurt, tamarind and mint chutney.", price: 160 },
      { name: "Dahi Bhalla", description: "Soft lentil dumplings in sweet yoghurt with spices.", price: 170 },
      { name: "Raj Kachori", description: "A giant crisp kachori loaded with sprouts, yoghurt and chutneys.", price: 190, tags: ["chef"] },
      { name: "Pani Puri (8 pcs)", description: "Crisp puris with spiced potato and tangy mint water.", price: 120 },
    ],
  },
  {
    id: "main-course",
    name: "Main Course",
    description: "Rich curries and home-style favourites, best with naan or rice.",
    items: [
      { name: "Paneer Butter Masala", description: "Cottage cheese in a rich tomato, butter and cashew gravy.", price: 340, tags: ["bestseller"], image: "/images/paneer-butter-masala.jpg" },
      { name: "Kadai Paneer", description: "Paneer with capsicum and onion in a freshly ground kadai masala.", price: 330, tags: ["spicy"] },
      { name: "Paneer Lababdar", description: "Grated and cubed paneer in a creamy onion-tomato gravy.", price: 350, tags: ["chef"] },
      { name: "Shahi Paneer", description: "Paneer in a mildly sweet, royal cashew and cream sauce.", price: 340 },
      { name: "Palak Paneer", description: "Paneer simmered in a smooth, garlicky spinach purée.", price: 320 },
      { name: "Malai Kofta", description: "Paneer and potato dumplings in a velvety cream gravy.", price: 330 },
      { name: "Mushroom Matar", description: "Mushrooms and green peas in a home-style masala.", price: 300 },
      { name: "Dum Aloo Kashmiri", description: "Baby potatoes slow-cooked in a yoghurt and fennel gravy.", price: 290 },
      { name: "Mix Vegetable", description: "Seasonal vegetables cooked with onion, tomato and spices.", price: 280 },
      { name: "Veg Kolhapuri", description: "Fiery mixed vegetables in a coconut and red chilli masala.", price: 290, tags: ["spicy"] },
      { name: "Baingan Bharta", description: "Fire-roasted aubergine mashed with onion, tomato and green chilli.", price: 260 },
      { name: "Chana Masala", description: "Chickpeas in a tangy Punjabi masala.", price: 260 },
    ],
  },
  {
    id: "dal",
    name: "Dal & Kadhi",
    description: "Slow-cooked lentils — the heart of every North Indian meal.",
    items: [
      { name: "Dal Makhani", description: "Black lentils slow-cooked overnight with butter and cream.", price: 290, tags: ["bestseller"], image: "/images/dal-makhani.jpg" },
      { name: "Dal Tadka", description: "Yellow lentils tempered with ghee, cumin, garlic and red chilli.", price: 240 },
      { name: "Rajma Masala", description: "Red kidney beans in a thick, home-style onion-tomato gravy.", price: 250 },
      { name: "Punjabi Kadhi Pakora", description: "Gram flour and yoghurt curry with soft onion pakoras.", price: 240 },
    ],
  },
  {
    id: "thali",
    name: "Thali",
    description: "A complete, wholesome meal on one plate.",
    items: [
      { name: "Mini Thali", description: "1 sabzi, dal, rice, 2 rotis, salad and pickle.", price: 249 },
      { name: "Kundeep Special Thali", description: "Paneer sabzi, seasonal sabzi, dal makhani, jeera rice, 2 butter rotis, raita, salad, papad and gulab jamun.", price: 399, tags: ["bestseller", "chef"], image: "/images/special-thali.jpg" },
      { name: "Maharaja Thali", description: "2 paneer dishes, seasonal sabzi, dal makhani, kadhi, veg pulao, choice of 3 breads, raita, chaat, salad and 2 desserts.", price: 549 },
    ],
  },
  {
    id: "biryani",
    name: "Biryani & Rice",
    description: "Fragrant long-grain basmati, dum-cooked or simply steamed.",
    items: [
      { name: "Veg Dum Biryani", description: "Basmati rice and vegetables layered with saffron, mint and fried onions.", price: 320, tags: ["bestseller"], image: "/images/veg-biryani.jpg" },
      { name: "Paneer Tikka Biryani", description: "Dum biryani with smoky paneer tikka, served with raita.", price: 350, tags: ["chef"] },
      { name: "Hyderabadi Veg Biryani", description: "Spicy Hyderabadi-style biryani with green chilli and herbs.", price: 330, tags: ["spicy"] },
      { name: "Veg Pulao", description: "Mildly spiced rice cooked with vegetables and whole spices.", price: 220 },
      { name: "Jeera Rice", description: "Basmati rice tempered with ghee and cumin.", price: 180 },
      { name: "Steamed Rice", description: "Plain steamed basmati rice.", price: 140 },
      { name: "Curd Rice", description: "Rice with yoghurt, tempered with mustard seeds and curry leaves.", price: 180 },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    description: "Fresh from the tandoor, made to order.",
    items: [
      { name: "Tandoori Roti", description: "Whole-wheat flatbread from the tandoor.", price: 30, priceNote: "Butter +₹10" },
      { name: "Plain Naan", description: "Soft leavened bread from the tandoor.", price: 50, priceNote: "Butter +₹10" },
      { name: "Garlic Naan", description: "Naan topped with garlic, coriander and butter.", price: 80, tags: ["bestseller"] },
      { name: "Cheese Garlic Naan", description: "Garlic naan stuffed with molten cheese.", price: 120 },
      { name: "Lachha Paratha", description: "Flaky, many-layered whole-wheat paratha.", price: 70 },
      { name: "Missi Roti", description: "Gram flour roti with onion, chilli and ajwain.", price: 60 },
      { name: "Amritsari Kulcha", description: "Crisp tandoor kulcha stuffed with spiced potato, served with chole.", price: 140, tags: ["chef"] },
      { name: "Stuffed Paratha", description: "Choice of aloo, gobi or paneer, served with curd and pickle.", price: 120, priceNote: "Paneer ₹150", image: "/images/stuffed-paratha.jpg" },
    ],
  },
  {
    id: "sides",
    name: "Raita & Sides",
    description: "The perfect accompaniments.",
    items: [
      { name: "Boondi Raita", description: "Yoghurt with crisp gram flour pearls and roasted cumin.", price: 120 },
      { name: "Mix Veg Raita", description: "Yoghurt with cucumber, onion, tomato and mint.", price: 130 },
      { name: "Green Salad", description: "Cucumber, onion, tomato, carrot and lemon.", price: 110 },
      { name: "Masala Papad", description: "Roasted papad topped with onion, tomato and chaat masala.", price: 70 },
      { name: "Roasted Papad", description: "Plain roasted papad (2 pcs).", price: 40 },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Something sweet to end on a high note.",
    items: [
      { name: "Gulab Jamun (2 pcs)", description: "Soft milk dumplings soaked in rose-cardamom syrup, served warm.", price: 120, tags: ["bestseller"], image: "/images/gulab-jamun.jpg" },
      { name: "Rasmalai (2 pcs)", description: "Cottage cheese discs in saffron and pistachio milk.", price: 150 },
      { name: "Moong Dal Halwa", description: "Rich lentil halwa slow-roasted in ghee.", price: 170, tags: ["chef"] },
      { name: "Gajar ka Halwa", description: "Winter special carrot halwa with khoya and nuts (seasonal).", price: 160 },
      { name: "Kulfi Falooda", description: "Malai kulfi with falooda, rose syrup and basil seeds.", price: 180 },
      { name: "Phirni", description: "Chilled ground-rice pudding set in a clay pot.", price: 140 },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing coolers and comforting hot drinks.",
    items: [
      { name: "Masala Chai", description: "Spiced Indian tea brewed with milk.", price: 60 },
      { name: "Filter Coffee", description: "South Indian decoction coffee with frothy milk.", price: 80 },
      { name: "Sweet Lassi", description: "Thick, chilled yoghurt drink topped with malai.", price: 110, tags: ["bestseller"] },
      { name: "Mango Lassi", description: "Yoghurt blended with ripe mango pulp.", price: 140 },
      { name: "Masala Chaas", description: "Spiced buttermilk with mint and roasted cumin.", price: 80 },
      { name: "Fresh Lime Soda", description: "Sweet, salted or mixed.", price: 90 },
      { name: "Jaljeera", description: "Tangy cumin and mint cooler.", price: 80 },
      { name: "Cold Coffee", description: "Creamy blended coffee with ice cream.", price: 150, tags: ["new"] },
      { name: "Mineral Water", description: "1 litre bottle.", price: 40 },
    ],
  },
];
