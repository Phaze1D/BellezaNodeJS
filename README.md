# Belleza Organica
> E-commerce website.

This repository is a production grade e-commerce website that I built for a client of mine. The backend is powered with ExpressJS, and the front-end is powered with ReactJS. The design was inspired by their previous website and improved on for a better user experience. You can view the production version of this website [here](https://beta.bellezaorganica.com.mx/home).

## Table of Content
- [Development](#development)
	- [Database](#database)
	- [Frontend](#frontend)
	- [Backend](#backend)
- [Production](#production)
	- [Security](#security)
	- [Optimization](#optimization)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Development
I split the development process into three different stages. The first stage was to understand how the current data was beginning stored, e.g., SQL, NoSQL. After I had a grasp on my client's data, I began writing the frontend code. I started with the frontend code mostly because I wanted to have something to show. Once I finished the frontend, I started coding up the backend and at the same time made some improvements to the frontend.

### Database
The previous website was using a MySQL database with a simple e-commerce structure. My initial thought was to move the data into a NoSQL database mostly because I like the flexibility of a NoSQL database, but I decided to stick with MySQL. I did make some structural changes to optimize the performance of the database, the biggest of which was as follows.

The previous version used three tables to structure the categories. I thought that this was a bit redundant, so I changed the tables into just one self-referencing table. This way I could use a simple select query to get all the categories at once without having to use joins.

<img src="./readme_images/before.png" height="160"/> -> <img src="./readme_images/after.png" height="160"/>


### Frontend
For the frontend code, I used what I like to call the **React Stack**, which is ReactJS, Redux, React Router, and ImmutableJS. Along with a bunch of great npm packages, I was able to quickly develop a user-friendly UI. I split my code into two spread parts, Pages, and Components. The main difference between a Page and a Component, with the exception of the Layout and Loader Components, is that a Component is unaware of Redux.


### Backend


## Production

### Security

### Optimization

## Usage

## Contributing

## License
