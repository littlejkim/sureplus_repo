# 1. Scaffold

<img width="234" alt="스크린샷 2021-03-01 오후 8 55 47" src="https://user-images.githubusercontent.com/31599475/109494225-f361ef00-7ad0-11eb-9ee4-4e5c3384711e.png">


## **assets/**

Just as the name implies, this houses static files (e.g images) used in the application.

## **redux/**

This holds all the redux files if you are using [react-redux](https://react-redux.js.org/) for managing state. Inside redux folder you have actions, reducers, store which can easily manage your redux files

#### **redux/actions**

All the action files which are using around redux goes here.

#### **redux/reducers**

All the reducers which are using around redux goes here.

#### **redux/store**

You can put your store inside this redux store folder.

## **components/**

Shared components used across features are placed in this directory. An example of such (as shown above) is the `layout` component, which is used to wrap the application components and determine its overall layout.

## **containers/**

You can put you all screen-based components inside here (Eg - SplashScreen, HomeScreen).

## **navigation/**

You project base navigation goes here. You can create stack navigator and export it to your application.

## **styles/**

If you have global styles defined in your project you can put it over here like colors, font styles like things.

## **utilities/**

You can put utils files over here.

## Naming conventions

### folders

/lowercase

### files

PascalCase.js

### variables

const camelCase = "this is a string"

### comments

// TODO: fix redux

// this is used for opening modal
