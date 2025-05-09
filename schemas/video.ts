import { defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'videoUrl', title: 'Video URL', type: 'url' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }
  ]
}) 