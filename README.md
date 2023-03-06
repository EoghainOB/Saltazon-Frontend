# Saltazon Front end

This front end is designed to work with the Saltazon DB listed here https://github.com/EoghainOB/SaltazonDB

This front end is created in React using Javascript. It is a web store which contains reseller's web stores along with admin backend. The main goal of this project was to create our own sign up and login page with different roles, without using pre made solutions. This has been achieved by using bcrypt to hash the user's password and also the use of JWT tokens for when the user logs in which are stored in 'http only' cookies for security reasons. 

The product section has pagination as well as search and filtering using backend endpoints.

The store itself has 3 levels of user: 'user', 'admin' and 'super-admin'. 

- When a user signs up to the site they are assigned a 'user' role which grants them access to the product list and the ability to add items to the cart. 
- The 'admin' user has the same site access but they are administrator of their own store within the Saltazon, giving them the ability to delete products or update stock levels as well as add new products.
- The 'super-admin' can add or delete stores, which is done by assigning a user's email to a new store. This process creates the new store and gives that 'user' new 'admin' user role. The super-admin can also act as administrator for all the stores, which they can access through their super-admin section.

The front end is connected to the backend (linked above) using Express and the site uses an SQlite database.

### User signup and login:
![SACreateUser](https://user-images.githubusercontent.com/110406695/223056124-34a9ced9-42b0-480f-9101-d61233a145f7.jpg)
![SALogin](https://user-images.githubusercontent.com/110406695/223056129-2a1c40a3-bddb-47c5-9fd3-638c5736a8b0.jpg)

### Main product page:
![SAProductPage](https://user-images.githubusercontent.com/110406695/223056155-b9f19113-10d6-4479-a330-5e0b3e56d7da.jpg)

### Product page with add to cart functionality:
![SAProduct](https://user-images.githubusercontent.com/110406695/223056153-7728c4cd-2356-4587-bf21-6f26820b11bb.jpg)

### Shopping cart:
![SACart](https://user-images.githubusercontent.com/110406695/223056150-b8f32b7b-88cb-4781-9d25-c59c1cd7a203.jpg)


### Super Admin and admin functionality:
![SASuperAdmin](https://user-images.githubusercontent.com/110406695/223056135-4eb9cbed-27d9-4234-808a-facc6ccd6914.jpg)
![SAAdmin](https://user-images.githubusercontent.com/110406695/223056141-49f92a7a-ad8b-43cb-9530-4de06f4d1685.jpg)
![SAAdmin2](https://user-images.githubusercontent.com/110406695/223056146-4d26705c-75e3-427b-844b-4f6a394d6d9b.jpg)


<i>This project is made using: </i>

<div>
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
</div>
