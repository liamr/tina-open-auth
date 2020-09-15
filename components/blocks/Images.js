import React from 'react'
import { useCMS } from 'tinacms'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'

function Images({ index }) {
  const cms = useCMS()
  
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <div className="image-diptych">
          <InlineImage
            name="left.src"
            parse={(filename) => `/public/img/${filename}`}
            uploadDir={() => '/public/img/'}
            previewSrc={(formValues) =>
              cms.api.github.getDownloadUrl(
                `/public/img/${formValues.blocks[index].left.src}`
              )
            }
            focusRing={false}
          />
          <InlineImage
            name="right.src"
            parse={(filename) => `/public/img/${filename}`}
            uploadDir={() => '/public/img/'}
            previewSrc={(formValues) =>
              cms.api.github.getDownloadUrl(
                `/public/img/${formValues.blocks[index].right.src}`
              )
            }
            focusRing={false}
          />
        </div>
      </div>
    </BlocksControls>
  )
}

export const imagesBlock = {
  Component: Images,
  template: {
    label: 'Image Diptych',
    defaultItem: {
      _template: 'images',
      left: {
        src: 'rico-replacement.jpg',
        alt: 'ocean',
      },
      right: {
        src: 'rico-replacement.jpg',
        alt: 'dunes',
      },
    },
    fields: [
      {
        name: 'left.src',
        label: 'Left-Hand Image',
        component: 'image',
        parse: (filename) => `${filename}`,
        uploadDir: () => '/public/img',
        previewSrc: (formValues, input) => {
          const index = input.field.name.split('.')[1]
          const currentBlockImage = formValues.blocks[index].left.src
          return currentBlockImage;
          // return cms.api.github.getDownloadUrl(
          //   `/public/img/${currentBlockImage}`
          // )
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
        parse: (filename) => `${filename}`,
        uploadDir: () => '/public/img',
        previewSrc: (formValues, input) => {
          const index = input.field.name.split('.')[1]
          const currentBlockImage = formValues.blocks[index].right.src
          return currentBlockImage;
          // return cms.api.github.getDownloadUrl(
          //   `/public/img/${currentBlockImage}`
          // )
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
