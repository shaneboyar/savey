# README

**Note: You must install the `foreman` gem globally, outside of this repo**

`bundle install`

`rails db:migrate`

`cd client/`

`yarn install`

`cd ../`

`foreman start -f Procfile.dev`


**Authentication**
We are using Knock for JWT management. [Read about Knock here](https://github.com/nsarno/knock).
