export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'tokens',
      title: 'Tokens',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
} 