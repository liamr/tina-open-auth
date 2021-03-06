import React from 'react'
import { useCMS } from 'tinacms'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'
import { Image } from 'cloudinary-react'

// <InlineImage
//   name="left.src"
//   parse={(media) => {
//     if (!media) return
//     return media.id
//   }}
//   focusRing={false}
// >
//   {({ src }) => (
//     <img
//       src={`${cms.enabled ? '' : `${process.env.MEDIA_BASE_URL}w_800/`}${src}`}
//       alt={``}
//     />
//   )}
// </InlineImage>

function Images({ index }) {
  const cms = useCMS()

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <div className="image-diptych">
          <InlineImage
            name="left.src"
            parse={(media) => {
              if (!media) return
              return media.id
            }}
            focusRing={false}
          >
            {({ src }) => (
              <div className="relative pt-full">
                <Image
                  className="absolute inset-0 object-cover w-full h-full"
                  cloudName={process.env.CLOUDINARY_CLOUD_NAME}
                  publicId={src}
                  width="auto"
                  crop="fill"
                  gravity="auto"
                  responsive
                />
              </div>
            )}
          </InlineImage>
          <InlineImage
            name="right.src"
            // @ts-ignore
            parse={(media) => {
              if (!media) return
              return media.id
            }}
            previewSrc={(id) => id}
          >
            {({ src }) => (
              <div className="relative pt-full">
                <Image
                  className="absolute inset-0 object-cover w-full h-full"
                  cloudName={process.env.CLOUDINARY_CLOUD_NAME}
                  publicId={src}
                  width="auto"
                  crop="fill"
                  gravity="auto"
                  responsive
                />
              </div>
            )}
          </InlineImage>
        </div>
      </div>
    </BlocksControls>
  )
}

export const imagesBlock = {
  Component: Images,
  template: {
    label: 'Image Diptych',
    // defaultItem: {
    //   _template: 'images',
    //   left: {
    //     src: 'blog_header_network_f5b051e987',
    //     alt: 'ocean',
    //   },
    //   right: {
    //     src: 'blog_header_network_f5b051e987',
    //     alt: 'dunes',
    //   },
    // },
    fields: [
      {
        name: 'left.src',
        label: 'Left-Hand Image',
        component: 'image',
        parse(media) {
          if (!media) return
          return media.id
        },
        focusRing: false,
      },
      {
        name: 'left.alt',
        label: 'Left-Hand Image Alt Text',
        component: 'text',
      },
      {
        name: 'right.src',
        label: 'Right-Hand Image',
        component: 'image',
        parse(media) {
          if (!media) return
          return media.id
        },
        focusRing: false,
      },
      {
        name: 'right.alt',
        label: 'Right-Hand Image Alt Text',
        component: 'text',
      },
    ],
  },
}
