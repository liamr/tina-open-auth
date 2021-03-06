import Head from 'next/head'
/*
 ** Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin, useCMS, useForm } from 'tinacms'
import { GetStaticProps } from 'next'
import { EditLink } from '../components/EditLink'
import { imagesBlock } from '../components/blocks/Images'
import { paragraphBlock } from '../components/blocks/Paragraph'
import { featureListBlock } from '../components/blocks/FeatureList'

import { InlineForm, InlineBlocks, } from 'react-tinacms-inline'
import { heroBlock } from '../components/blocks/Hero'


export default function Home({ file, preview }) {

  const cms = useCMS()

  const formOptions = {
    label: 'Inline Page',
    //initialValues: data,
    onSubmit() {
      cms.alerts.success('Saved!')
    },
  }

  /*
   ** Register a JSON Tina Form
   */
  const [, form] = useGithubJsonForm(file, formOptions)
  //const [, form] = useForm(formConfig)
  usePlugin(form)

  // useGithubToolbarPlugins()


  return (
    <div className="flex flex-col min-h-screen">
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
      <EditLink />
    </div>
  )
}

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
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
      fileRelativePath: 'content/inline.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/inline.json',
        data: (await import('../content/inline.json')).default,
      },
    },
  }
}

// https://community.tinacms.org/t/file-creation-upload-in-open-authoring/175
