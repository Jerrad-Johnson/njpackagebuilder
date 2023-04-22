# NextJS Justified Gallery (njGallery)
***
## Usage

### Import

```require ...```


### Setup

Run

```npx @next/codemod next-image-to-legacy-image```

Set remote image access in `next.js.config`, e.g. 

```
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'businessbackend.jerradjohnson.com'],
    },
}
```

### Sample Gallery call

```
const photoArray: ImageArrayData[] = [
    {
        src: "http://localhost:3001/temp/162A2061.jpg",
        blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
        height: 300,
        width: 300,
        alt: "Butterfly!",
    }, {
        src: "http://localhost:3001/temp/162A2061.jpg",
        blurSrc: "http://localhost:3001/leaflet/base64_thumbnails/macro/162A2078.jpg",
        height: 200,
        width: 300,
    }];

const galleryInputs: GalleryInputs = {
    images: photos
}
```

```
<NjGallery
   { ...galleryInputs }
/>
```

### Requirements

Every image must include `src` (url), `height`, and `width`. Height and width must be provided as whole numbers representing pixel measurements, e.g. `300`.

If you're dynamically generating a list, pass an empty array of images `[]` until the data is loaded. Example: `const galleryInputs = { images: [] }`

`blurSrc` is not required, but highly recommended. `alt` is also not required.

***

## Options

**Default values will be used** if none of these values are set, and therefore you do not have to set any options.

### Details
Unless otherwise stated, any number examples must be a whole number, e.g. `20` and will be interpreted as a pixel value.

`containerWidth` Defines the width of your gallery's container. The value can be any valid CSS. Example: `200px`, `50%`. Default: `100%`

`containerPadding` Defines the padding of your gallery's container, and more padding leaves less room for images. Default: `10`.

`imagePadding` Defines the padding **between** images. You can set `horizontal`, `vertical`, or both. Default: `{vertical: 10, horizontal: 10}`.

`targetRowHeight` Although image height will vary, the algorithm will attempt to keep them at or close to this value. Default: `300`.

`showIncompleteRows` Determines whether images will be hidden if they do not complete a row. For example, if you have six images, and four fit on a single row, and the last two cannot be sized to fill the next row, then they will be omitted entirely. Must be boolean. Default: `true`.

`targetRowHeightTolerance` Decimals are allowed, and the range is from `0` to `1`. At `0`, as long as the container is large enough, no vertical resizing will occur. All images will be at their target height, and no justification will occur. This value **will** often distort images, and is not recommended. Default: `.2`

`maxRows` Limits the number of rows of images your gallery will display; beyond this, images will be hidden. Example: `3`. Default: `Number.POSITIVE_INFINITY`.


### Sample
```
const galleryInputs: GalleryInputs = {
    images: photoArray, 
    containerWidth: "100%",
    containerPadding: 10,
    imagePadding: {vertical: 10, horizontal: 10},
    targetRowHeight: 300,
    showIncompleteRows: false,
    targetRowHeightTolerance: .2,
    maxRows: 1,
}
```

***
## Requirements

#### React

`useState`, `useEffect`. Gallery is built on React-18, and should be future-version compatible.

### NextJS

`<Image>` tag.

***

# Credits

NextJS Justified Gallery uses a **slightly** modified justified-layout script by SmugMug.

Their license is included in the respective folder `justified-layout` of this package.