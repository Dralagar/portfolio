import { defineType } from 'sanity'

export default defineType({
  name: 'podcast',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'videoUrl', title: 'Video URL', type: 'url' },
    { name: 'audioUrl', title: 'Audio URL', type: 'url' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'duration', title: 'Duration', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }
  ]
}) 