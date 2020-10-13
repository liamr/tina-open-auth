import React from 'react'
import { useCMS } from 'tinacms'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'

function Images({ index }) {
  const cms = useCMS()

  console.log(cms.enabled)


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
            {({src}) => <img src={`${cms.enabled ? '' : `${process.env.MEDIA_BASE_URL}w_800/`}${src}`} alt={``} />}
          </InlineImage>
          <InlineImage
            name="right.src"
            parse={(media) => {
              if (!media) return
              return media.id
            }}
            focusRing={false}
          >{({src}) => <img src={`${cms.enabled ? '' : `${process.env.MEDIA_BASE_URL}w_800/`}${src}`} alt={``} />}</InlineImage>
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
