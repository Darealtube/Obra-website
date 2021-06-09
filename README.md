# Introduction

Hello! Welcome to the OFFICIAL repository for our project!

## Notes

The project is going to be made with Typescript. Don't worry if you don't know it, just send some JS

files and I'm going to convert it to Typescript. It will also serve as a practice for me.

This project's CSS contains MATERIAL UI and CSS in JS, so make sure to learn them.

Also, learn how to do Github because that's how you'll be able to contribute to this repo project.

## Programming Notes

### useQuery data

There are many useQueries that are scattered around pages and components alike and they differ based on

if the page has a `getServerSideProps` or just client-side rendered. If there is a `getServerSideProps` and

there is a useQuery, the useQuery can destructure its data for cleaner, easier to read code. This is not the case when

it is client-side rendered, because it would return undefined. If it is client side rendered, make sure to do `?.`

before accessing the data in order for it to work, and if `data` needs to be put in a conditional, always check first if

data exists.

### Dynamic Imports (NextJS)

Dynamic imports are used in our website in order to lessen first load JS. We usually use it in components such as

`Popovers` and `Drawers` that are not usually seen immediately. Use `dynamic import` in every chance that it

could be used on, but not every time.

### Typescript Interfaces

Everytime a new useQuery or a new useMutation is added, we must also update the typescript interfaces that we use throughout the website.

This is in order to maintain order in our code and to prevent unnecessary bugs from happening.

### NextJS <Link> component, <a>, and router.push()

ONLY use NextJS `<Link>` component IF:

The page navigated to is a page with `getServerSideProps/getStaticProps`

The page navigated to is a static prop (no useQueries)

ONLY use `<a>` IF:

The page navigataed to is client rendered (with `useQuery` but no `getStaticProps/getServerSideProps`)

ONLY use `router.push()` IF:

It is used inside a function
