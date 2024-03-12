const userArgs = process.argv.slice(2)
const User = require('./models/userModel')
const Brand = require('./models/brandModel')
const Category = require('./models/categoryModel')
const Item = require('./models/itemModel')
const Flavor = require('./models/flavorModel')
const bcrypt = require('bcryptjs')
require('dotenv').config()
 
const Mongoose = require('mongoose')
Mongoose.set('strictQuery',false)
const mongoDB = process.env.SESSION_SERVER
main().catch((err) => console.log(err))
const flavors = []
const categories = []
const brands = []
async function main(){
    console.log("Debug: About to connect")
    await Mongoose.connect(mongoDB)
    console.log("Debug: Should be connected")
    await createCategories()
    await createFlavor()
    await createBrands()
    await createItems()
    await createUser()
    console.log("Debug:closing mongoose")
    Mongoose.connection.close()
}
async function flavorCreate(name){
    const flavor = new Flavor({flavor:name})
    await flavor.save()
    console.log(`adding flavor ${name}`)
    flavors.push(flavor)
}

async function categoryCreate(name){
    const category = new Category({type:name})
    await category.save()
    console.log(`Added category ${name}`)
    categories.push(category)
}
async function brandCreate(name){
    const brand = new Brand({name:name})
    await brand.save()
    console.log(`Added Brand ${name}`)
    brands.push(brand)
}

async function userCreate(first, last, email, password, bool){
    const user = new User({firstName:first, lastName:last, email:email, password:password, admin:bool})
    await user.save()
    console.log(`Added user with name of ${first}`)
}
async function itemCreate(category,brand, name, flavors, stock, sum){
    let item 
    if(flavors === undefined){
        item =new Item({category:category, brand:brand, product:name, stock:stock, summary:sum})
    }else{
       item = new Item({category:category, brand:brand, product:name, flavors:flavors, stock:stock, summary:sum})
    }
    await item.save()
    console.log(`Added item, ${brand} ${name} with the flavors ${flavors} and summary ${sum}`)
}

async function createItems(){
    console.log('Creating Items')
    await Promise.all([
        itemCreate(categories[0],brands[0],'Select 27-Servings',[flavors[0],flavors[1],flavors[2],flavors[3]],0,'PEScience Select Protein is a whey and casein blend protein powder designed to provide sustained muscle support https://pescience.com/products/select-protein. '),
        itemCreate(categories[0],brands[0], 'Select 55-Servings',[flavors[0],flavors[1],flavors[2]],0,'PEScience Select Protein is a whey and casein blend protein powder designed to provide sustained muscle support https://pescience.com/products/select-protein. '),
        itemCreate(categories[0],brands[1],'Whey Isolate',[flavors[4], flavors[5],flavors[2]],0,"Whether you're a seasoned athlete or a fitness enthusiast, Like A Pro Whey Protein Isolate is a potent tool to elevate your workout recovery and maximize your muscle-building potential. With its impressive protein content, clean ingredients, and focus on fast absorption, it's the perfect post-workout partner to help you achieve your fitness goals."),
        itemCreate(categories[0], brands[0], 'Select Vegan 27-Servings', [flavors[0],flavors[6]],0,'make a description of the whey isolate protein from the brand like a pro'),
        itemCreate(categories[0], brands[2], 'Farm Fed ~ Grass-Fed Whey Protein Isolate', [flavors[0],flavors[7],flavors[8],flavors[3]],0, "Axe & Sledge Farm Fed Protein isn't your average protein powder. It's crafted for the dedicated gym-goer, the one who pushes themselves to the limit and demands the best from their supplements."),
        itemCreate(categories[0], brands[2], 'Home Made ~ Whole Foods Meal Replacement', [flavors[9],flavors[0], flavors[2]],0, 'Axe & Sledge Home Made is the ideal solution for those who crave convenience without sacrificing nutrition. It provides a complete and balanced meal replacement packed with whole food ingredients, protein for muscle health, and delicious flavors to keep you satisfied. Make Home Made your partner in crime for a healthy and active lifestyle.'),
        itemCreate(categories[1],brands[2], 'The Grind ~ EAAS, BCAAs, & Hydration', [flavors[10], flavors[11], flavors[12]],0,'Axe & Sledge The Grind is the perfect intra-workout partner for serious athletes and gym enthusiasts. It delivers a potent combination of muscle support, hydration, and recovery enhancers, allowing you to train harder, recover faster, and push your limits further.  So ditch the basic options and choose The Grind to elevate your workouts and conquer your fitness goals.'),
        itemCreate(categories[1], brands[1], 'BCAA/EAA', flavors.slice(13,16),0,"Like A Pro BCAA + EAA is the comprehensive solution you need to elevate your workouts and optimize your results. It provides a complete amino acid profile, promotes muscle growth and recovery, keeps you hydrated, and ensures peak performance during training.  Ditch the basic options and choose Like A Pro BCAA + EAA to  push your limits and achieve your fitness goals faster." ),
        itemCreate(categories[1], brands[3], 'Intra Blast',flavors.slice(16,19),0, 'Overall, NutraBio Intra Blast is a comprehensive intra-workout formula designed to support muscle growth and recovery, enhance performance, and keep you hydrated throughout your training sessions. With its focus on quality ingredients, transparency, and taste, Intra Blast could be a valuable asset to your workout routine.'),
        itemCreate(categories[1], brands[3], 'Leg Day',flavors.slice(18,20),0,'NutraBio Leg Day is the ultimate intra-workout partner for leg training.  It provides a comprehensive blend of performance-enhancing ingredients, promotes sustained energy, optimizes hydration, and supports recovery.  So ditch the basic options and choose Leg Day to conquer your toughest leg workouts and reach your fitness goals faster.' ),
        itemCreate(categories[2], brands[4], 'BZRK Pre-Workout 25-Servings',flavors.slice(20,23),0,'Black Magic BZRK is a potent pre-workout option for experienced users seeking an extra boost of energy, focus, and pumps to take their workouts to the next level.  Remember, with great power comes great responsibility , use BZRK responsibly and according to the labels directions.' ),
        itemCreate(categories[2], brands[5], 'Pandamic Pre-Workout',[flavors[20], flavors.slice(24,26)],0, "Panda Supps Pandemic Pre-Workout is the ultimate weapon for those who crave intense energy, laser focus, and legendary pumps.  It's the perfect companion to push your limits and dominate your workouts like never before. So ditch the average pre-workout and choose Pandemic ,train like the world depends on it."),
        itemCreate(categories[2], brands[6],'Mesomorph Pre-Workout',undefined ,0,"APS Mesomorph is the pre-workout formula designed to elevate your training experience.  With its focus on energy, pumps, endurance, and recovery, it provides a comprehensive solution to help you achieve peak performance and push your limits further. So ditch the basic options and choose Mesomorph ,unleash your inner beast and conquer your workouts."),
        itemCreate(categories[3], brands[7],'Superhuman Pump',[flavors.slice(38,40),flavors[28]],0,"Alpha Lion Superhuman Pump is the ultimate stimulant-free pre-workout for those who crave insane pumps, impressive muscle growth, and laser focus during their workouts. Ditch the jitters and experience the pump of your life with Superhuman Pump.  Dominate the gym and achieve your fitness goals faster."),
        itemCreate(categories[2],brands[0],'Prolific Pre-Workout', [flavors[20],[flavors.slice(26,28)]],0, "Prolific isn't just another pre-workout. It's a comprehensive solution designed to elevate every aspect of your training. With its focus on energy, focus, performance, pumps, and endurance, Prolific provides the tools you need to unlock your full potential and dominate your workouts. So ditch the average pre-workout ,choose Prolific and experience the difference for yourself." ),
        itemCreate(categories[3],brands[8],'NITR-OX-Pump Formula',flavors.slice(29,32),0,'NITR-OX Pump Formula is designed to take your workouts to the next level. With its focus on massive pumps, sustained energy, enhanced focus, and intra-workout performance, it provides a comprehensive solution to fuel your body and mind for peak performance. So ditch the basic pre-workout and choose NITR-OX ,experience the difference and conquer your fitness goals.' ),
        itemCreate(categories[3],brands[1],'Outsized',flavors.slice(32,34),0," Ditch the sugary pre-workouts and jittery stimulants. Choose Like A Pro Outsized, the non-stimulant pre-workout designed to deliver massive muscle pumps, support focus, and keep you hydrated for an overall enhanced training experience.  Feel the difference ,train harder, experience the pump, and achieve your fitness goals with Like A Pro Outsized."),
        itemCreate(categories[4],brands[8],'Tauro Test', undefined,0,'Tauro Test by Project AD is a natural supplement designed to support healthy testosterone levels in men.  By incorporating a blend of potentially beneficial ingredients, it may help you achieve your fitness goals and overall well-being.  Remember, consult with a doctor before use to ensure its right for you.'),
        itemCreate(categories[4], brands[9], 'SAUCE',undefined, 0, 'Unbound SAUCE is the ultimate pre-workout for serious athletes seeking to maximize their testosterone potential.  With its comprehensive blend of ingredients, it supports natural testosterone production, optimizes hormone balance, and fuels muscle growth, strength gains, and enhanced performance.  So ditch the basic options and choose SAUCE ,the ultimate weapon to break through plateaus and conquer your fitness goals.' ),
        itemCreate(categories[4], brands[3], 'Tongkat Ali: The Root of Vitality', undefined, 0 ,"Tongkat ali is a traditional herb with potential health benefits, particularly for men's health. While research is ongoing, it's important to consult with a healthcare professional before using tongkat ali to discuss potential benefits, risks, and appropriate dosage."),
        itemCreate(categories[4], brands[3], 'KSM-66 Ashwaganda', undefined, 0, " KSM-66 Ashwagandha is a premium, science-backed extract offering the highest concentration of withanolides.  If you're looking for a potent and effective way to experience the potential benefits of ashwagandha, KSM-66 is the perfect choice.  It can help you manage stress, improve sleep, enhance physical performance, and promote overall well-being."),
        itemCreate(categories[4],brands[10], 'Arimplex:Post-Cycle Therapy Support', undefined, 0, "Hi-Tech Pharmaceuticals Arimplex can be a valuable tool for those seeking to support their body's natural testosterone production and overall well-being after completing a cycle of prohormones or other supplements that may impact hormone levels. However, it's important to remember it should be used responsibly and with guidance from a healthcare professional."),
        itemCreate(categories[5], brands[10], 'Laxogenin 100', undefined, 0, "Hi-Tech Laxogenin 100 offers a unique and potentially effective way to support your muscle-building goals.  By promoting protein synthesis, potentially reducing cortisol, and aiding recovery, it can be a valuable tool in your natural fitness journey. However, remember that a healthy diet and consistent training are still crucial for achieving optimal results."),
        itemCreate(categories[5], brands[10], "Turkeserone",undefined,0,"Hi-Tech Turkesterone 650 provides a plant-based alternative for athletes and fitness enthusiasts seeking to support muscle growth and recovery.  With its focus on natural ingredients, enhanced absorption technology, and transparent labeling, it offers a unique option for those who want to optimize their training results naturally." ),
        itemCreate(categories[5], brands[0], "Trucreatine 30-Servings", undefined, 0, " PEScience TrueCreatine is the creatine workhorse you need to maximize your strength training results. With its pure creatine monohydrate formula, convenient serving size, and unflavored versatility, it's the perfect foundation for any athlete or gym-goer looking to build muscle, increase strength, and reach their fitness goals faster." ),
        itemCreate(categories[6], brands[1],'Burn Away v6', undefined, 0, "Like A Pro Burn Away v6 is the next-level fat-burning formula designed to support your weight management goals.  With its focus on enhanced thermogenesis, stress management, and metabolic health, it provides a comprehensive approach to burning fat and achieving your desired physique. (Disclaimer: Always consult with a doctor before using any weight loss supplements. Individual results may vary)  However, remember that a healthy diet and exercise are essential for sustainable weight loss."),
        itemCreate(categories[6], brands[10], 'Lipodrene', undefined, 0, ' Hi-Tech Pharmaceuticals Lipodrene is a high-risk supplement due to the presence of Ephedra. While it may promote short-term weight loss, the potential health risks are significant.  Safer and more sustainable methods for weight loss are readily available.'),
        itemCreate(categories[6], brands[3], 'Lean Shot', undefined, 0, "NutraBio LeanShot is a potent thermogenic formula designed to support your fat-burning goals. It can help increase metabolism, boost energy, manage cravings, and keep you focused ,all factors that can contribute to successful weight management.  Combine LeanShot with a healthy diet and exercise routine for optimal results."),
        itemCreate(categories[6], brands[8],'Shredabul', undefined, 0 ," Shredabull isn't just about burning fat; it's about empowering you to achieve your fitness goals. With its focus on enhanced metabolism, appetite control, and boosted energy, it provides a comprehensive solution to help you reach your peak physique.  So ditch the basic fat burners and choose Shredabull , ignite your inner athlete and incinerate fat for a shredded and energized you." ),
        itemCreate(categories[7],brands[0], 'Omega3+', undefined, 0, "PEScience Omega-3+ is a powerful and convenient way to support your overall health and well-being.  With its high concentration of EPA and DHA, commitment to purity, and focus on a pleasant experience, it's the perfect addition to your daily routine. So ditch the low-quality options and choose Omega-3+ to supercharge your health from the inside out"),
        itemCreate(categories[7],brands[0], 'Trumulti',[flavors[34], flavors[40]], 0,"PEScience TruMulti is the perfect daily multivitamin for anyone who leads an active lifestyle.  With its focus on complete nutrition, optimal dosages, and athlete-specific ingredients, it provides the essential building blocks your body needs to perform at its best. So ditch the basic multivitamins and choose TruMulti ,fuel your inner athlete and support your overall health and well-being." ),
        itemCreate(categories[7],brands[11], 'Liver+',undefined,0," Revive Liver+ is the perfect daily companion for anyone seeking to support their liver health and overall wellbeing. With its focus on detoxification, protection, and energy optimization, it empowers you to live a healthy and active lifestyle.  Take charge of your well-being and choose Revive Liver+ to keep your inner strength thriving."),
        itemCreate(categories[7],brands[11], 'Heart', undefined, 0, " Revive Heart is a proactive approach to maintaining a healthy heart and a vibrant life.  By providing comprehensive heart health support, it empowers you to take charge of your wellbeing and invest in a healthier future.  Choose Revive Heart and feel the difference a healthy heart can make in your life." ),
        itemCreate(categories[7],brands[2],"Greens+", flavors.slice(35,38),0, "Axe & Sledge Greens+ is the perfect daily addition to a healthy lifestyle.  With its blend of greens, digestive support, hydration ingredients, and stress-balancing adaptogens, it provides a convenient and comprehensive way to support your overall health and well-being.  Choose Axe & Sledge Greens+ and feel the difference a daily dose of greens can make!" ),
        itemCreate(categories[7],brands[11], "Tumeric", undefined, 0, "Revive Turmeric is a proactive approach to managing discomfort and supporting a healthy inflammatory response.  By providing a high-quality, bioavailable form of curcumin, it empowers you to take charge of your well-being and live an active, comfortable life. Choose Revive Turmeric and feel the difference a daily dose of curcumin power can make.")
    ])
}

async function createFlavor(){
    console.log('Adding Flavors')
    await Promise.all([
       flavorCreate('Vanilla'), //0
        flavorCreate('Choclate Truffle'), //1
        flavorCreate('Peanut Butter Cookie'), //2
        flavorCreate('Cookies n Cream'), //3
        flavorCreate('Milk Choclate'), //4
        flavorCreate('Cookie Crumble'), //5
        flavorCreate('Choclate'), //6
        flavorCreate('Salted Caramel'), //7
        flavorCreate('Peanut Butter Honey'), //8
        flavorCreate('Triple Choclate'), //9
        flavorCreate('Blue Icee'), //10
        flavorCreate('Red Icee'), //11
        flavorCreate('Sharkbite'), //12
        flavorCreate('Pink Lemonade'), //13
        flavorCreate('Blue Breeze'), //14
        flavorCreate('Cherry Candy'), //15
        flavorCreate('New York Punch'), //16
        flavorCreate('Orange Mango'), //17
        flavorCreate('Blue Lemonade'), //18 
        flavorCreate('Peachy Glutes'), //19 
        flavorCreate('Peach Sour Rings'), //20
        flavorCreate('Mango'), //21
        flavorCreate('Haterade'), //22
        flavorCreate('Blue Ice'), //23
        flavorCreate('Phoenix'), //24
        flavorCreate('Gummy Worms'), //25
        flavorCreate('Rasberry Lemonade'), //26
        flavorCreate('Guava'), //27 
        flavorCreate('Blue Steel'), //28
        flavorCreate('Strawberry'), //29
        flavorCreate('Citrus'), //30
        flavorCreate('Unflavored'), //31
        flavorCreate('Peach Lemonade'), //32
        flavorCreate('Cherry'), //33
        flavorCreate('His'), //34
        flavorCreate('Apple Banana'), //35
        flavorCreate('Orange'),//36
        flavorCreate('Pinapple'), //37
        flavorCreate('Peach'),
        flavorCreate('Mango'),
        flavorCreate("Hers")
    ])
}

async function createCategories(){
    console.log('Adding categories')
    await Promise.all([
        categoryCreate('Protein'),
        categoryCreate('Aminos'),
        categoryCreate('Preworkout-Stim'),
        categoryCreate('Preworkout-Pump'),
        categoryCreate('Hormones'),
        categoryCreate('Muscle Builder'),
        categoryCreate('Fat Burner'),
        categoryCreate('MicroNutrients')
    ])
}
 
async function createBrands(){
    console.log('Adding Brands')
    await Promise.all([
        brandCreate('Pescience'),
        brandCreate('Like a Pro'),
        brandCreate('Axe and Sledge'),
        brandCreate('Nutra Bio'),
        brandCreate('Black Magic'),
        brandCreate('Panda Supps'),
        brandCreate('APS Nutrition'),
        brandCreate('Alpha Lion'),
        brandCreate('Project Ad'),
        brandCreate('Unbound'),
        brandCreate('Hi Tech Pharmaceuticals'),
        brandCreate('Revive'),
    ])
}



 