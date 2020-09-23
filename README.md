# Vue.js CMS Table

This bundle provides Vue.js components suitable to build typical Content Management System tables.
With regard to responsiveness and flexibility, the "table" is however constructed using bootstrap rows and columns.

## Installing

```bash
yarn add barthy-koeln/vue-cms-table
```

## Usage Example

The example below displays a table that has three rows: "Name", "Created At", and "Actions".
This expects, that a `GET` request to `/admin/api/some-entity/search` returns an array of objects that have the properties `slug`, `name`, and `created_at`.

More information about the configuration and column options can be found further down this document. 

```vue
<template>
    <div class="page">
        <entity-table :columns="columns"
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
      columns() {
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

| Name                | Type   | Required/Default        | Description                                                                             |
|---------------------|--------|-------------------------|-----------------------------------------------------------------------------------------|
| `searchPath`        | `String` | Required                | URL/Path for the `GET` request that returns the data.                                   |
| `columns`           | `Array`  | Required                | Array of column configurations. See below for details.                                  |
| `entityKey`         | `String` | Required                | Key of a uniquely identifying property in the entity data. Typically `id` or `slug`.    |
| `searchLabel`       | `String` | `'Search'`              | Title of the search form                                                                |
| `searchPlaceholder` | `String` | `'Type here to search'` | Placeholder of the default search field.                                                |
| `filters`           | `Object` | `{}`                    | Object of filters for the search, following the structure `{name: 'value'}`.            |
| `defaultOrdering`   | `Array`  | `[]`                    | Array like `['name', 'order']`, where `order` is one of `asc` or `desc`.                |

## Column Types

Define columns as simple objects following a specific schema.

* [Common Options](#common-options)
* [Replacements](#replacements)
* [Boolean Column](#boolean-column)
* [String Column](#string-column)
* [Link Column](#link-column)
* [Compound Column](#compound-column)
* [Map Column](#map-column)
* [Date Column](#date-column)
* [Image Column](#image-column)
* [Input Column](#input-column)
* [Toggle Column](#toggle-column)
* [Actions Column](#actions-column)
  * [Link Action](#link-action)
  * [Button Action](#button-action)

<br><br>
### Common Options

Every column configuration has common options: 

| Name                | Type   | Required/Default        | Description                                          |
|---------------------|--------|-------------------------|------------------------------------------------------|
| `type`              | `String` | Required                | Column type, one of the types defined below.         |
| `title`             | `String` | Required                | Titles that shows in the table header.               |
| `classes`           | `Array`  | `[]`                    | Additional classes for both header and data columns. |

<br><br>
### Replacements

Whenever the option `replacements` occurs, it maps placeholders in a string to entity property names: 

```js
const column = {
  type: 'link',
  path: '/entity/show/__ID__',
  replacements: {
    '__ID__': 'id'
  }
}
```

The column will then replace `__ID__` with the value of `entity['id']` and therefore create a unique path for each result row.

<br><br>
### Boolean Column

**Type:** `boolean`

Displays an icon based on the true/false evaluation of the property.

<details>
    <summary>Options</summary>
    
| Name                | Type     | Required/Default        | Description                                                             |
|---------------------|----------|-------------------------|-------------------------------------------------------------------------|
| `name`              | `String` | Required                | Entity property name, which is converted to a boolean value using `!!`. |

</details>

<br><br>
### String Column

**Type:** `string`

Displays a string.

<details>
    <summary>Options</summary>
    
| Name                | Type     | Required/Default        | Description           |
|---------------------|----------|-------------------------|-----------------------|
| `name`              | `String` | Required                | Entity property name. |

</details>

<br><br>
### Link Column

**Type:** `link`

Displays an entity property and wraps it in a link.

<details>
    <summary>Options</summary>
    
| Name                | Type     | Required/Default        | Description                                         |
|---------------------|----------|-------------------------|-----------------------------------------------------|
| `name`              | `String` | Required                | Entity property name.                               |
| `path`              | `String` | Required                | Path/URL template.                                  |
| `replacements`      | `Array`  | `{}`                    | [See replacements.](#replacements)                  |

The column will then replace `__ID__` with the value of `entity['id']`.

</details>

<br><br>
### Compound Column

**Type:** `compound`

Displays a concatenated string from multiple property values.

<details>
    <summary>Options</summary>

| Name                | Type     | Required/Default        | Description                                              |
|---------------------|----------|-------------------------|----------------------------------------------------------|
| `names`             | `String` | Required                | Entity property names.                                   |
| `separator`         | `String` | Required                | Separator between the property values. Can contain HTML. |

</details>

<br><br>
### Map Column

**Type:** `map`

Displays a string mapped by a property value.

<details>
    <summary>Options</summary>
    
| Name                | Type     | Required/Default        | Description                                                                                       |
|---------------------|----------|-------------------------|---------------------------------------------------------------------------------------------------|
| `name`              | `String` | Required                | Entity property name.                                                                             |
| `map`               | `Map`    | Required                | Map that has entity property values as keys and strings. String to be displayed can contain HTML. |

</details>

<details>
    <summary>Example</summary>

If your entity has a property called `status`, that can be one of `APPROVED`, `DENIED`, `PENDING`, you can instead show eloquent messages using the `map` column:

```js
const column = {
  type: 'map',
  name: 'status',
  map: new Map([
    ['APPROVED', 'Nothing to do here.'],
    ['DENIED', 'Please contact the user.'],
    ['PENDING', 'Needs admin approval.'],
  ]),
}
```

</details>

<br><br>
### Date Column

**Type:** `date`

Displays a formatted date.

<details>
    <summary>Options</summary>
    
| Name                | Type                  | Required/Default        | Description                                                                                      |
|---------------------|-----------------------|-------------------------|--------------------------------------------------------------------------------------------------|
| `name`              | `String`              | Required                | Entity property name. Will be parsed by `new Date()`.                                             |
| `formatter`         | `Intl.DateTimeFormat` | `new Intl.DateTimeFormat(navigator.language, {year: 'numeric', month: '2-digit', day: '2-digit'})` | Formats the Date.     |

</details>

<br><br>
### Image Column

**Type:** `image`

Displays an image.

<details>
    <summary>Options</summary>
    
| Name                | Type     | Required/Default          | Description                                                             |
|---------------------|----------|---------------------------|-------------------------------------------------------------------------|
| `name`              | `String` | Required                  | Entity property name.                                                   |
| `path`              | `String` | Required                  | Path/URL template.                                                      |
| `replacements`      | `Array`  | `{}`                      | [See replacements.](#replacements)                                      |
| `fallback`          | `String` | `undefined` / no fallback | In case the image property under `name` is empty, use a fallback image. |

</details>

<br><br>
### Input Column

**Type:** `input`

Displays an editable input field, that sends a request on change.

<br><br>
### Toggle Column

**Type:** `toggle`

Displays a toggle button that sends a request on change.

<br><br>
### Actions Column

**Type:** `action`

Displays any number of actions as defined below.

#### Action Types

##### Link Action

Displays a link as a button.

##### Button Action

Displays a button and adds a click listener wth the passed callback.