import React, { useEffect, useState } from 'react'

import { useCMS } from 'tinacms'

export default function Image({ src, ...props }) {
  const cms = useCMS()
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const getPreviewImage = async () => {
      if (cms.media.previewSrc == typeof 'function') {
        const previewImage = await cms.media.previewSrc(src)
        setImageSrc(previewImage)
      } else {
        // Can add cloudinary image transforms: https://cloudinary.com/documentation/image_transformation_reference
        setImageSrc(`${process.env.MEDIA_BASE_URL}w_1200/${src}`)
      }
    }

    if (cms && cms.media) getPreviewImage()
  }, [src])

  if (!imageSrc) return null

  return <img src={imageSrc} {...props} />
}
