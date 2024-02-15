import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'pic-share',

  projectId: 'sozr8g7t',
  dataset: 'pic-share',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
