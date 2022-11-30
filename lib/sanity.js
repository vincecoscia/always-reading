import { createCurrentUserHook } from 'next-sanity'
import {definePreview} from 'next-sanity/preview'
import createImageUrlBuilder from '@sanity/image-url'
import { config } from './config'

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const usePreview = definePreview(config)