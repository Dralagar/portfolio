// schemas/podcast.js
export default {
    name: 'podcast',
    type: 'document',
    title: 'Podcast Episode',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description'
      },
      {
        name: 'audioUrl',
        type: 'url',
        title: 'Audio File URL'
      },
      {
        name: 'videoUrl',
        type: 'url',
        title: 'Video File URL (optional)'
      },
      {
        name: 'thumbnail',
        type: 'image',
        title: 'Thumbnail'
      },
      {
        name: 'duration',
        type: 'string',
        title: 'Duration'
      },
      {
        name: 'date',
        type: 'datetime',
        title: 'Publish Date'
      },
      {
        name: 'tags',
        type: 'array',
        of: [{ type: 'string' }],
        title: 'Tags'
      }
    ]
  }
  