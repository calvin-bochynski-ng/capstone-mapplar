# Project Title - Mapplar

## Overview

Mapplar is able to help travellers to find and plan their intinerary for the
duration of their stay at any place/countries. It will have a map with markers
to show iconic places at set locations, users can hover over/ tap / click the markers to view
images uploaded by friends and allow the website to give the user the intinerary
plan.

### Problem

Travelling has been difficult when user don't have time to plan their
intinerary, even if they have the time, they will have to go through all
resources (websites/books) to plan what they want to do or places to visit
during their stay, this is more difficult especially for first time travellers.

### User Profile

Anyone who is looking to travel to another place/countries whether they are a
first time traveler to the new destination or have traveled to the destination
and wanting to visit iconic sites and have the days plan for them to avoid
any stress.

### Features

- users authentication system
- interactive map
- interactive itinerary
- display pictures of iconic sites in the city

## Implementation

### Tech Stack

- React
- React Router
- Node - Express
- Knex
- MapBox
- Database - SQL
- react-icons

### APIs

MapBox - Map interaction with pictures
OpenAi - Generating Itinerary
Firebase - Upload image and return image url (maybe)
EXIF - npm package to return EXIF Metadata

### Sitemap

Non-User

Hero / Landing Page, Sign in / Up Page

User
Home / Social Page, Map Plannar Page , User Profile / User itinerary Page, Sign Out

### Mockups

Logo -

![](./mock-up-and-ideas/plain-logo.png)

Title with logo - ![](./mock-up-and-ideas/logo-text-main.png)

Fonts Heading - Garamond Premier Pro

Fonts Body - Noto Sans

@import url('https://fonts.googleapis.com/css?family=Garamond%20Premier%20Pro:700|Noto%20Sans:400');

body {
font-family: 'Noto Sans';
font-weight: 400;
}

h1, h2, h3, h4, h5 {
font-family: 'Garamond Premier Pro';
font-weight: 700;
}

Color Palette -

light: (

- text: #020812,
- background: #f1f5fe,
- primary: #4c82f6,
- secondary: #bddaa4,
- accent: #f08c00,
  ),
  ![](./mock-up-and-ideas/Light%20Mode.png

![](./mock-up-and-ideas/mobile-mock-up.png)
![](./mock-up-and-ideas/tablet-mock-up.png)
![](./mock-up-and-ideas/desktop-mock-up.png)

### Data

Describe your data and the relationships between them. You can show this
visually using diagrams, or write it out.

![](./mock-up-and-ideas/drawSQL-capstone-export-2024-01-22.png)

Most of them are one to many relationships

### Endpoints

- /user/ (.post)
- /user/:id (.get, .put)
- /user/:id/itinerary/ (.get)
- /user/:id/itinerary/:id (.get)
- /destination (.get)
- /sites/:site_id (.get)
- /sites/images (.get)

### Auth

Could require a login feature where for a non-user will only show Home/Sign-In
page. After the user has logged in there will be a social media page,
map-planning page and a sign-out page.

Using JWT auth to authenicate users, at the beginning a fake user id or fake
login page would be implemented, but it would be nice to have a fully
functioning auth platform.

## Roadmap

- create database

  - migration
  - seed

- create server side

  - create all the end points for get destinations and sites
  - create post users for authentication (Login / Sign up page)
  - craete end point to send request body to OpenAi and receive response

- create client side

  - using mapbox and markers to map out all sites available for selection
  - create a post request to send selected sites to server
  - create a page for getting all previous itineraries for user

- bug fixes

- DEMO DAY

## Nice-to-haves

- abilities to change from light mode to dark mode
  dark:

- - text: #edf3fd
- - background: #01050e
- - primary: #093fb3
- - secondary: #3e5b25
- - accent: #ff9b0f

  ![](./mock-up-and-ideas/Dark%20Mode.png)

- fully functing auth page for user including google/ facebook and apple
  authenitcation

- ability to create different users like normal users, premium users and admins.

- send intinerary to user's email by generating PDF, either sending or
  downloading pdf.

- forget password functionality

- ability to add a paid feature for premium users for more indepth itiniery

- ability to edit or add new sites into the web app as an admin
