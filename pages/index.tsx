import Head from 'next/head'
/*
 ** Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin } from 'tinacms'
import { GetStaticProps } from 'next'
import { EditLink } from '../components/EditLink'

export default function Home({ file, preview }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', label: 'Title', component: 'text' },
      { name: 'subtitle', label: 'Subtitle', component: 'text' },
      {
        label: 'Header Image',
        name: 'img',
        component: 'group',
        fields: [
          {
            label: 'Image',
            name: 'src',
            component: 'image',
            parse: (filename) => `../img/${filename}`, // How it's written to .json
            uploadDir: () => '/public/img/', // The upload directory.
            previewSrc: (data) => {
              console.log({ data })
              const imgPreviewPath = data.img.src.replace('../img', 'https://raw.githubusercontent.com/liamr/tina-open-auth/master/public/img')
              return `${imgPreviewPath}`
            },
          },
          { label: 'Alt Text', name: 'alt', component: 'text' },
        ],
      },
    ],
  }

  /*
   ** Register a JSON Tina Form
   */
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  // useGithubToolbarPlugins()

  // console.log({data})

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <div className="py-5 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="text-5xl">{data.title}</h1>
            <h2 className="text-2xl">{data.subtitle}</h2>
            <img src={data.img.src} />
          </div>
        </div>
        <div className="container py-5 mx-auto">
          <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <a href="https://nextjs.org/docs" className="card">
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className="card">
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/zeit/next.js/tree/master/examples"
              className="card"
            >
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="card"
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </div>
      </main>

      <footer>
        <div className="container flex justify-between py-5 mx-auto">
          <a
            href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
          </a>

          <EditLink />
        </div>
      </footer>
    </div>
  )
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}

// https://community.tinacms.org/t/file-creation-upload-in-open-authoring/175