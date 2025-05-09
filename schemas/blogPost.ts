export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'isPremium',
      title: 'Premium Content',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'price',
      title: 'Price (Tokens)',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'engagement',
      title: 'Engagement',
      type: 'object',
      fields: [
        {
          name: 'views',
          title: 'Views',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'uniqueVisitors',
          title: 'Unique Visitors',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'averageTimeSpent',
          title: 'Average Time Spent (seconds)',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'completionRate',
          title: 'Completion Rate',
          type: 'number',
          initialValue: 0
        }
      ]
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'object',
      fields: [
        {
          name: 'averageRating',
          title: 'Average Rating',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'totalRatings',
          title: 'Total Ratings',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'helpfulCount',
          title: 'Helpful Count',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'engagementScore',
          title: 'Engagement Score',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'sentimentAnalysis',
          title: 'Sentiment Analysis',
          type: 'object',
          fields: [
            {
              name: 'positive',
              title: 'Positive',
              type: 'number',
              initialValue: 0
            },
            {
              name: 'negative',
              title: 'Negative',
              type: 'number',
              initialValue: 0
            },
            {
              name: 'neutral',
              title: 'Neutral',
              type: 'number',
              initialValue: 0
            }
          ]
        },
        {
          name: 'qualityScore',
          title: 'Quality Score',
          type: 'number',
          initialValue: 0
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection: { author: string }) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
} 