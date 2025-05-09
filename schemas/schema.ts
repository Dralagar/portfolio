import { defineType, defineField } from 'sanity'
import author from './author'
import blogPost from './blogPost'
import category from './category'

export const schemaTypes = [author, blogPost, category]

export default {
  name: 'default',
  types: schemaTypes,
}