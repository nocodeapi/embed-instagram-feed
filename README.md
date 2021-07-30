# \<embed-instagram-feed>

This plugin is developed by [NoCodeAPI](https://nocodeapi.com).

This is reliable and secure method to embed your instagram feed into your static webpages without any coding.

### First step:

- Get your Instagram API endpoint via NoCodeAPI ↳ https://nocodeapi.com/instagram-api

- Add this script into your webpage `<head>` tag.

```javascript
<script
  type="module"
  src="https://unpkg.com/@nocodeapi/embed-instagram-feed@latest/embed-instagram-feed.js?module"
></script>
```

- Just place the `<embed-instagram-feed url="Your Instagram API from NoCodeAPI"></embed-instagram-feed>` into your webpage `<body>` where you want to display your Instagram feeds.

### Full code sample

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Embed Instagram Feed</title>
    <script
      type="module"
      src="https://unpkg.com/@nocodeapi/embed-instagram-feed@latest/embed-instagram-feed.js?module"
    ></script>
  </head>
  <body>
    <embed-instagram-feed
      url="Your Instagram API from NoCodeAPI"
    ></embed-instagram-feed>
  </body>
</html>
```

### Using npm package
