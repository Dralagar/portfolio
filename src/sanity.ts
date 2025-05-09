import { type SchemaTypeDefinition } from 'sanity'
import podcast from '../schemas/podcast'
import author from '../schemas/author'
import blogPost from '../schemas/blogPost'
import category from '../schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blogPost, category, podcast].map((type) => {
    const prepareFunction = (type.preview && typeof type.preview === 'object' && typeof type.preview.prepare === 'function')
      ? (value: Record<string, any>, viewOptions?: any) => {
          const preparedValue = type.preview.prepare(value, viewOptions);
          return {
            ...preparedValue,
            subtitle: preparedValue.subtitle || '',
          };
        }
      : (value: Record<string, any>) => ({
          ...value,
          subtitle: '',
        });

    return {
      ...type,
      preview: {
        ...type.preview,
        prepare: prepareFunction,
      },
    };
  }),
}
            subtitle: preparedValue.subtitle || '',
          };
        }
      : (value: Record<string, any>) => ({
          ...value,
          subtitle: '',
        });
      }
      
    return {
      ...type,
      preview: {
        ...type.preview,
        prepare: prepareFunction,
      },
    };
  }),
}
