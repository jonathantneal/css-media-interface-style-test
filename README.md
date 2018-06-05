# test-media-color-scheme

test-media-color-scheme lets you test `@media (color-scheme)`:

```pcss
:root {
  --link: #0000d6;
  --background-color: #fff;
  --color: #000;
}

@media (color-scheme: dark) {
  :root {
    --link: #00c0ff;
    --background-color: #000;
    --color: #fff;
  }
}
```

## Testing

```bash
git clone git@github.com:jonathantneal/test-media-color-scheme.git
cd test-media-color-scheme
npm install
npm start
```
