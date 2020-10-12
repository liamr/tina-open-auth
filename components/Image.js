import React, { useEffect, useState } from 'react'

import { useCMS } from 'tinacms'

export default function Image({ src }) {
  const cms = useCMS()
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const getPreviewImage = async () => {
      //if (cms.media.previewSrc == typeof 'function') {
        // todo - only works in dev mode
        const previewImage = await cms.media.previewSrc(src)
        setImageSrc(previewImage)
      //}
    }

    if (cms && cms.media) getPreviewImage()
  }, [src])

  if (!imageSrc) return null

  return <img src={imageSrc} />
}
