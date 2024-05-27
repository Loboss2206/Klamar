# What changed in the backend ?

## PayloadTooLarge issue

We had an issue with the payload size being too large when uploading image files for the quizzes, questions and the users. We fixed it by increasing the payload size limit in the `build-server.js` file.

By adding the lines : 
```javascript
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
```
We increased the payload size limit to 50mb. Why 50mb ? Because we think it's a reasonable size for an image file in the case we have multiple uploads like in the questions creation, when we can have up to 4 images.