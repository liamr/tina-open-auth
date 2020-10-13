import React, { useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider, ModalProvider, Media,
  MediaList,
  MediaListOptions,
  MediaStore } from 'tinacms'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import { GlobalStyles, FontLoader } from '@tinacms/styles'
import { BrowserStorageApi } from '../utils/plugins/browser-storage-api/BrowserStorageApi'
import {
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github'
import { Image } from 'cloudinary-react'
import { CloudinaryMediaStore } from '../lib/next-tinacms-cloudinary/cloudinary-media-store'

import path from 'path'

import '../styles/app.css'


// the following line will cause all content files to be available in a serverless context
path.resolve('./content/')

const github = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: "liamr/tina-open-auth", //process.env.BASE_REPO_FULL_NAME,
})



const MainLayout = ({ Component, pageProps }) => {
  const tinaConfig = {
    enabled: pageProps.preview,
    toolbar: pageProps.preview,
    sidebar: pageProps.preview,
    apis: {
      github,
      storage:
        typeof window !== 'undefined'
          ? new BrowserStorageApi(window.localStorage)
          : {},
    },
    // media: {
    //   //store: new GithubMediaStore(github),
    //   //store: new CloudinaryMediaStore()
    // },
    plugins: [],
  }

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])

  useEffect(() => {
    cms.media.store = new CloudinaryMediaStore(
      process.env.CLOUDINARY_CLOUD_NAME
    )
    // @ts-ignore
    window.github = cms.media.store
  }, [])

  useEffect(() => {
    import('react-tinacms-date').then(({ DateFieldPlugin }) => {
      cms.plugins.add(DateFieldPlugin)
    })
    import("react-tinacms-editor").then(
      ({ MarkdownFieldPlugin, HtmlFieldPlugin }) => {
        cms.plugins.add(MarkdownFieldPlugin)
        cms.plugins.add(HtmlFieldPlugin)
      }
    )
  }, [pageProps.preview])

  const enterEditMode = async () => {
    const token = localStorage.getItem('tinacms-github-token') || null
    const headers = new Headers()

    if (token) {
      headers.append('Authorization', 'Bearer ' + token)
    }
    // The auto redirect was causing a problem here.
    const response = await fetch(`/api/preview?cb=1`, { headers })
    const data = await response.json()

    if (response.status === 200) {
      window.location.reload()
    } else {
      throw new Error(data.message)
    }
  }

  const exitEditMode = () => {
    fetch(`/api/reset-preview`).then(() => {
      window.location.reload()
    })
  }

  const loadFonts = useShouldLoadFont(cms)

  return (
    <TinaProvider cms={cms} 
    styled={false}
    >
      <GlobalStyles />
      {loadFonts && <FontLoader />}

      <ModalProvider>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
        >
          <DefaultSeo
            title={data.seoDefaultTitle}
            titleTemplate={'%s | ' + data.title}
            description={data.description}
            openGraph={{
              type: 'website',
              locale: 'en_CA',
              url: data.siteUrl,
              site_name: data.title,
              images: [
                {
                  url: 'https://tinacms.org/img/tina-twitter-share.png',
                  width: 1200,
                  height: 628,
                  alt: `TinaCMS`,
                },
              ],
            }}
            twitter={{
              handle: data.social.twitterHandle,
              site: data.social.twitterHandle,
              cardType: 'summary_large_image',
            }}
          />
          <Head>
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <meta name="theme-color" content="#E6FAF8" />
          </Head>
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </ModalProvider>
    </TinaProvider>
  )
}

function useShouldLoadFont(cms: TinaCMS) {
  const [enabled, setEnabled] = React.useState(cms.enabled)

  React.useEffect(() => {
    if (cms.enabled) return
    return cms.events.subscribe('cms:enable', () => {
      setEnabled(true)
    })
  }, [])

  return enabled
}

class Site extends App {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      // TagManager.initialize({
      //   gtmId: process.env.GTM_ID,
      // })
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return <MainLayout Component={Component} pageProps={pageProps} />
  }
}

export default Site

// export default class Site extends App {
//   cms: TinaCMS

//   constructor(props) {
//     super(props)
//     /**
//      * 1. Create the TinaCMS instance
//      */
//     this.cms = new TinaCMS({
//       enabled: !!props.pageProps.preview,
//       apis: {
//         /**
//          * 2. Register the GithubClient
//          */
//         github: new GithubClient({
//           proxy: '/api/proxy-github',
//           authCallbackRoute: '/api/create-github-access-token',
//           clientId: process.env.GITHUB_CLIENT_ID,
//           baseRepoFullName: process.env.BASE_REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
//         }),
//       },
//       /**
//        * 3. Use the Sidebar and Toolbar
//        */
//       sidebar: props.pageProps.preview,
//       toolbar: props.pageProps.preview,
//     })
//   }

//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       /**
//        * 4. Wrap the page Component with the Tina and Github providers
//        */
//       <TinaProvider cms={this.cms}>
//         <TinacmsGithubProvider
//           onLogin={onLogin}
//           onLogout={onLogout}
//           error={pageProps.error}
//         >
//           {/**
//            * 5. Add a button for entering Preview/Edit Mode
//            */}
//           <EditLink cms={this.cms} />
//           <Component {...pageProps} />
//         </TinacmsGithubProvider>
//       </TinaProvider>
//     )
//   }
// }

// const onLogin = async () => {
//   const token = localStorage.getItem('tinacms-github-token') || null
//   const headers = new Headers()

//   if (token) {
//     headers.append('Authorization', 'Bearer ' + token)
//   }

//   const resp = await fetch(`/api/preview`, { headers: headers })
//   const data = await resp.json()

//   if (resp.status === 200) {
//     window.location.reload()
//   } else {
//     throw new Error(data.message)
//   }
// }

// const onLogout = () => {
//   return fetch(`/api/reset-preview`).then(() => {
//     window.location.reload()
//   })
// }

// export interface EditLinkProps {
//   cms: TinaCMS
// }

// export const EditLink = ({ cms }: EditLinkProps) => {
//   return (
//     <button className="absolute px-2 py-1 bg-gray-300 rounded" onClick={() => cms.toggle()}>
//       {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
//     </button>
//   )
// }

