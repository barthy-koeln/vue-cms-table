# Vue.js CMS Table

This bundle provides Vue.js components suitable to build typical Content Management System tables.
With regard to responsiveness and flexibility, the "table" is however constructed using bootstrap rows and columns.

## Installing

```bash
yarn add barthy-koeln/vue-cms-table
```

## Usage Example

The example below displays a table that has three rows: "Name", "Created At", and "Actions".
This expects, that a `GET` request to `/admin/api/some-entity/search` returns an array of objects that have the fields `slug`, `name`, and `created_at`.

More information about the configuration and column options can be found further down this document. 

```vue
<template>
    <div class="page">
        <entity-table :fields="fields"
                      entity-key="slug"
                      search-label="Search SomeEntity"
                      search-placeholder="Id, Name, …"
                      search-path="/admin/api/some-entity/search"
                      :default-ordering="['created_at', 'desc']"
        />
    </div>
</template>

<script>
  import EntityTable   from 'vue-cms-table/src/vue/EntityTable.vue';
    
  export default {
    name: 'SomeEntity',
    
    components: {
      EntityTable
    },

    computed: {
      fields() {
        return [
          {
            names:     'first_name',
            type:      'string',
            title:     'Name',
            classes:   ['col-5', 'col-md-2']
          },
          {
            name:    'created_at',
            type:    'date',
            title:   'Created At',
            classes: ['d-none', 'd-md-flex', 'col-md-2']
          },
          {
            type:    'actions',
            title:   'Actions',
            classes: ['col-2', 'col-md-3'],
            actions: [
              {
                type:         'link',
                title:        'View',
                icon:         'cil-link',
                replacements: {'__SLUG__': 'slug'},
                path:         '/some-entity/__SLUG__'
              },
              {
                type:         'link',
                title:        'Edit',
                icon:         'cil-pencil',
                replacements: {'__SLUG__': 'slug'},
                path:         '/some-entity/edit/__SLUG__'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

## Component Props

The `entity-table` component takes the following props:

| Name                | Type   | Required/Default        | Description                                                                   |
|---------------------|--------|-------------------------|-------------------------------------------------------------------------------|
| `searchPath`        | String | Required                | URL/Path for the `GET` request that returns the data.                         |
| `fields`            | Array  | Required                | Array of field configurations. See below for details.                         |
| `entityKey`         | String | Required                | Key of a uniquely identifying field in the data. Typically `id` or `slug`.    |
| `searchLabel`       | String | `'Search'`              | Title of the search form                                                      |
| `searchPlaceholder` | String | `'Type here to search'` | Placeholder of the default search field                                       |
| `filters`           | Object | `{}`                    | Object of filters for the search, following the structure `{field: 'value'}`. |
| `defaultOrdering`   | Array  | `[]`                    | Array like `['field', 'order']`, where `order` is one of `asc` or `desc`.     |

## Field/Column Types

Every field configuration has common options: 



### Action Column

type: `action`
actions: Array
