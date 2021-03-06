# Vue.js CMS Table

[![DeepScan grade](https://deepscan.io/api/teams/11039/projects/13961/branches/248774/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11039&pid=13961&bid=248774)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This bundle provides *opinionated* Vue.js components suitable to build
typical Content Management System tables. With regard to responsiveness
and flexibility, the "table" is however constructed using bootstrap rows
and columns.

* [Installing](#installing)
* [CoreUI](#coreui)
  + [Theming CoreUI](#theming-coreui)
  + [CoreUI Icons](#coreui-icons)
* [Usage Example](#usage-example)
* [Data API](#data-api)
* [Main Component Props](#main-component-props)
* [Search Form](#search-form)
* [Replacements](#replacements)
* [Columns](#columns)
  + [Boolean Column](#boolean-column)
  + [String Column](#string-column)
  + [Link Column](#link-column)
  + [Compound Column](#compound-column)
  + [Map Column](#map-column)
  + [Date Column](#date-column)
  + [Image Column](#image-column)
  + [Input Column](#input-column)
  + [Toggle Column](#toggle-column)
  + [Custom Column](#custom-column)
  + [Actions Column](#actions-column)
    - [Link Action](#link-action)
    - [Button Action](#button-action)


<br/>

## Installing

```shell script
yarn add barthy-koeln/vue-cms-table
```

<br/>

## CoreUI

These components use [@coreui/coreui](https://github.com/coreui/coreui),
[@coreui/vue](https://github.com/coreui/vue) and
[@coreui/icons](https://github.com/coreui/coreui-icons).

### Theming CoreUI

Follow the guide on
["Theming CoreUI for Bootstrap 4"](https://coreui.io/docs/getting-started/theming/).

### CoreUI Icons

Register icons globally as described in the
[CoreUI Vue.js Icon Documentation](https://coreui.io/vue/docs/components/icon.html).

Add color styles:

```scss
@each $name, $color in $theme-colors {
  .icon-#{$name} {
    fill: $color;
  }
}
```

<br>

## Usage Example

The example below displays a table that has three rows: "Name", "Created
At", and "Actions". This expects that a `GET` request to
`/admin/api/some-entity/search` returns an array of objects that have
the properties `slug`, `name`, and `created_at`.

<details>
    <summary>Show Example Code</summary>

```vue
<template>
    <div class="page">
        <entity-table 
          :columns="columns"
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
            name:     'first_name',
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
                replacements: new Map([['__SLUG__', 'slug']]),
                path:         '/some-entity/__SLUG__'
              },
              {
                type:         'link',
                title:        'Edit',
                icon:         'cil-pencil',
                replacements: new Map([['__SLUG__', 'slug']]),
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

</details>

More information about the column types and options can be found
[further down this document](#columns).

<br/>

## Data API

The data endpoints specified in the option `searchPath`
([see below](#main-component-props)) must accept and return JSON data.

<details>
    <summary>Request Sent</summary>

<br/>

**Method:** `GET`

**Content Type:** URL-Encoded

**Request Parameters:**

| Name       | Type     | Description                                                                                                                               |
|:-----------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------|
| `search`   | `String` | Contains the search input field value.                                                                                                    |
| `page`     | `Number` | The current page to fetch. The server determines the amount of results per page.                                                          |
| `filters`  | `Object` | A filter map of `'property' => 'value'`. This parameter is equivalent to the [main component's property `filters`](#main-component-props) |
| `ordering` | `Object` | An ordering map of `'property' => 'direction'`.                                                                                           |

</details>

<details>
    <summary>Expected Response</summary>

<br/>

**Content Type:** JSON

**Response Body:**

| Name        | Type       | Required/Default | Description                              |
|:------------|:-----------|:-----------------|:-----------------------------------------|
| `page`      | `Number`   | Required         | The 'current' page, should start at `1`. |
| `pageCount` | `Number`   | Required         | Number of pages.                         |
| `entities`  | `Object[]` | Required         | Results.                                 |

</details>

<br/>

## Main Component Props

The `entity-table` component takes the following props:

| Name                | Type        | Required/Default        | Description                                                                          |
|:--------------------|:------------|:------------------------|:-------------------------------------------------------------------------------------|
| `searchPath`        | `String`    | Required                | URL/Path for the `GET` request that returns the data.                                |
| `columns`           | `Array`     | Required                | Array of column configurations. See below for details.                               |
| `entityKey`         | `String`    | Required                | Key of a uniquely identifying property in the entity data. Typically `id` or `slug`. |
| `searchLabel`       | `String`    | `'Search'`              | Title of the search form                                                             |
| `searchPlaceholder` | `String`    | `'Type here to search'` | Placeholder of the default search field.                                             |
| `filters`           | `Object`    | `{}`                    | Object of filters for the search, following the structure `{name: 'value'}`.         |
| `defaultOrdering`   | `String[2]` | `[]`                    | Array like `['name', 'order']`, where `order` is one of `asc` or `desc`.             |

<br/>

## Search Form

By default, the component displays a simple search input. if you want to
add more filters and inputs, use the main component's `'search-form'`
slot.

<details>
    <summary>Example</summary>

<br/>

```vue
<template>
    <entity-table 
      :default-ordering="['type', 'asc']"
      :columns="columns"
      :filters="filters"
      entity-key="id"
      search-label="Search Things"
      search-path="/admin/api/things/search"
      search-placeholder="Thing, Stuff, …"
    >
      <template #search-form>
        <label for="filter-suggestions">Show only approved things</label>
        <c-switch 
          id="filter-suggestions"
          color="primary"
          name="filter-suggestions"
          shape="pill"
          @update:checked="toggleFilterApproved"
        />
            
        <c-select
          id="filter-type"
          :options="typeOptions"
          add-input-classes="mb-0"
          label="Filter by Type"
          @update:value="setFilterType"
        />
      </template>
    </entity-table>
</template>

<script>
import EntityTable        from 'vue-cms-table/src/vue/EntityTable.vue';
import {CSelect, CSwitch} from '@coreui/vue'

export default {
  name: 'Taxonomies',

  components: {
    EntityTable,
    CSwitch,
    CSelect
  },

  data() {
    return {
      filters: {}
    }
  },

  methods: {
    toggleFilterApproved(checked) {
      if (checked) {
        this.$set(this.filters, 'approved', false);
        return
      }

      this.$delete(this.filters, 'approved');
    },

    setFilterType(value) {
      if (value !== 'all') {
        this.$set(this.filters, 'type', value);
        return
      }

      this.$delete(this.filters, 'type');
    }
  },

  computed: {
    columns() {
      return [
        {
          name:    'type',
          type:    'string',
          title:   'Type',
          classes: ['col-2', 'col-md-2']
        },
        {
          name:         'title',
          type:         'string',
          title:        'Title',
          classes:      ['col-4', 'col-md-3']
        },
        {
          name:    'created_at_dt',
          type:    'date',
          title:   'Created At',
          classes: ['d-none', 'd-md-flex', 'col-md-1']
        },
      ]
    }
  }
}
</script>
```

</details>

<br/>

## Replacements

Whenever the option `replacements` occurs, it maps placeholders in a
string to entity property names:

```javascript
const column = {
  type: 'link',
  path: '/entity/show/__ID__',
  replacements: new Map([
    ['__ID__', 'id']
  ])
}
```
Replacement maps must have the signature `Map<String|RegExp, String>`.

The column will then replace `__ID__` with the value of `entity['id']`
and therefore create a unique path for each result row.

<br/>

## Columns

Define columns as simple objects following a specific schema.

<details>
    <summary>Common Column Options</summary>

| Name      | Type       | Required/Default | Description                                          |
|:----------|:-----------|:-----------------|:-----------------------------------------------------|
| `type`    | `String`   | Required         | Column type, one of the types defined below.         |
| `title`   | `String`   | Required         | Titles that shows in the table header.               |
| `classes` | `String[]` | `[]`             | Additional classes for both header and data columns. By default, each column gets the class `col`, which uses flex-box to automatically size columns. |
| `align`   | `String`   | No alignment     | One of `'start'`, `'center'` or `'end'`. Aligns both header and column. |
</details>

<br/>

### Boolean Column

`type: 'boolean'`

Displays an icon based on the true/false evaluation of the property.

<details>
    <summary>Options</summary>

| Name   | Type     | Required/Default | Description                                                             |
|:-------|:---------|:-----------------|:------------------------------------------------------------------------|
| `name` | `String` | Required         | Entity property name, which is converted to a boolean value using `!!`. |

</details>

<br/>

### String Column

`type: 'string'`

Displays a string.

<details>
    <summary>Options</summary>

| Name   | Type     | Required/Default | Description           |
|:-------|:---------|:-----------------|:----------------------|
| `name` | `String` | Required         | Entity property name. |

</details>

*NOTE: Array values will be concatenated with a comma as separator.

<br/>

### Link Column

`type: 'link'`

Displays an entity property and wraps it in a link.

<details>
    <summary>Options</summary>

| Name           | Type                         | Required/Default | Description                        |
|:---------------|:-----------------------------|:-----------------|:-----------------------------------|
| `name`         | `String`                     | Required         | Entity property name.              |
| `path`         | `String`                     | Required         | Path/URL template.                 |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements) |

The column will then replace `__ID__` with the value of `entity['id']`.

</details>

<br/>

### Compound Column

`type: 'compound'`

Displays a concatenated string from multiple property values.

<details>
    <summary>Options</summary>

| Name        | Type     | Required/Default | Description                                                                                |
|:------------|:---------|:-----------------|:-------------------------------------------------------------------------------------------|
| `names`     | `String` | Required         | Entity property names.                                                                     |
| `separator` | `String` | Required         | Separator between the property values. Cannot contain HTML, except entities like `'&nsbp;'` or `'&rarr;'`.  Use `'\n'` for line breaks. |

</details>

<br/>

### Map Column

`type: 'map'`

Displays a string mapped by a property value.

<details>
    <summary>Options</summary>

| Name   | Type                  | Required/Default | Description                                                                                           |
|:-------|:----------------------|:-----------------|:------------------------------------------------------------------------------------------------------|
| `name` | `String`              | Required         | Entity property name.                                                                                 |
| `map`  | `Map<String, String>` | Required         | Map that has entity property values as keys and strings. Strings to be displayed cannot contain HTML. |

</details>

<details>
    <summary>Example</summary>

If your entity has a property called `status`, that can be one of
`APPROVED`, `DENIED`, `PENDING`, you can instead show eloquent messages
using the `map` column:

```javascript
const column = {
  type: 'map',
  name: 'status',
  map: new Map([
    ['APPROVED', 'Nothing to do here.'],
    ['DENIED', 'Please contact the user.'],
    ['PENDING', 'Needs admin approval.']
  ])
}
```

</details>

<br/>

### Date Column

`type: 'date'`


Displays a formatted date.

<details>
    <summary>Options</summary>

| Name        | Type                  | Required/Default                                                                                   | Description                                           |
|:------------|:----------------------|:---------------------------------------------------------------------------------------------------|:------------------------------------------------------|
| `name`      | `String`              | Required                                                                                           | Entity property name. Will be parsed by `new Date()`. |
| `formatter` | `Intl.DateTimeFormat` | `new Intl.DateTimeFormat(navigator.language, {year: 'numeric', month: '2-digit', day: '2-digit'})` | Formats the Date.                                     |

</details>

<br/>

### Image Column

`type: 'image'`


Displays an image.

<details>
    <summary>Options</summary>

| Name           | Type                         | Required/Default | Description                                                                                                                |
|:---------------|:-----------------------------|:-----------------|:---------------------------------------------------------------------------------------------------------------------------|
| `name`         | `String`                     | Required         | Entity property name.                                                                                                      |
| `path`         | `String`                     | Required         | Path/URL template.                                                                                                         |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements)                                                                                         |
| `fallback`     | `String`                     | no fallback      | In case the image property under `name` is empty, use a fallback image. This will also be used in case of a loading error. |

</details>

<br/>

### Input Column

`type: 'input'`

Displays an editable input field, that shows a button on change and
sends a request when pressing it.

<details>
    <summary>Options</summary>

<br/>

| Name           | Type                         | Required/Default | Description                                                                                                                                                              |
|:---------------|:-----------------------------|:-----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`         | `String`                     | Required         | Entity property name.                                                                                                                                                    |
| `action`       | `String`                     | Required         | Action Path/URL template                                                                                                                                                 |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements)                                                                                                                                       |
| `requestInit`  | `Object`                     | `{}`             | Options to be passed to the `fetch` call. [See possible properties.](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) NOTE: `body` will be overwritten. |
| `critical`     | `Function`                   | no handler       | Callback when the request fails (result code not 200–299). Arguments: `(response, column, entity)`.                                                                      |
| `error`        | `Function`                   | no handler       | Callback when the application returns a response body where `status` unequals `'success'`. Arguments: `(body, column, entity)`.                                          |

</details>

<details>
    <summary>Request Sent</summary>

<br/>

**Method:** `POST`

**Content Type:** JSON

**Request Body:**

| Name    | Type  | Description                         |
|:--------|:------|:------------------------------------|
| `value` | `Any` | Contains the new input field value. |

</details>

<details>
    <summary>Expected Response</summary>

<br/>

**Content Type:** JSON

**Response Body:**

| Name     | Type     | Required/Default | Description                                                                |
|:---------|:---------|:-----------------|:---------------------------------------------------------------------------|
| `status` | `String` | Required         | `'success'` if all went well, anything else to trigger the error callback. |

*NOTE: You can send any number of additional data in case something went
wrong. Typically along the lines of "reason" or "message". The entire
response body will be passed to the error callback.*

</details>

<br/>

### Toggle Column

`type: 'toggle'`

Displays a toggle button that sends a request on change.

<details>
    <summary>Options</summary>

<br/>

| Name           | Type                         | Required/Default | Description                                                                                                                            |
|:---------------|:-----------------------------|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------|
| `name`         | `String`                     | Required         | Entity property name.                                                                                                                  |
| `action`       | `String`                     | Required         | Action Path/URL template                                                                                                               |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements)                                                                                                     |
| `requestInit`  | `Object`                     | `{}`             | Options to be passed to the `fetch` call. [See possible properties.](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) |
| `critical`     | `Function`                   | no handler       | Callback when the request fails (result code not 200–299). Arguments: `(response, column, entity)`.                                    |
| `error`        | `Function`                   | no handler       | Callback when the application returns a response body where `status` unequals `'success'`. Arguments: `(body, column, entity)`.        |

</details>

<details>
    <summary>Request Sent</summary>

<br/>

**Method:** `POST`

**Content Type:** JSON

**Request Body:** empty / defined in `requestInit` option.

</details>

<details>
    <summary>Expected Response</summary>

<br/>

**Content Type:** JSON

**Response Body:**

| Name      | Type      | Required/Default | Description                                                                |
|:----------|:----------|:-----------------|:---------------------------------------------------------------------------|
| `status`  | `String`  | Required         | `'success'` if all went well, anything else to trigger the error callback. |
| `checked` | `Boolean` | Required         | Boolean value indicating the new state.                                    |


*NOTE: You can send any number of additional data in case something went
wrong, typically along the lines of "reason" or "message". The entire
response body will be passed to the error callback.*

</details>

<br/>

### Custom Column

Use your own Vue.js component as a column. Make sure to add the
appropriate props described below.

<details>
    <summary>Options</summary>

<br/>

| Name        | Type     | Required/Default | Description                                                                           |
|:------------|:---------|:-----------------|:--------------------------------------------------------------------------------------|
| `component` | `Object` | Required         | Vue.js component, either a globally registered component name, or a component object. |

*NOTE: You can pass any amount of additional options. These will be
passed as a prop to each instance of your column component.*

</details>

<details>
    <summary>Component Props</summary>

<br/>

| Name     | Type     | Description                                                                     |
|:---------|:---------|:--------------------------------------------------------------------------------|
| `column` | `Object` | Column declaration. This holds any option you passed in the column declaration. |
| `entity` | `Object` | A result row/entity object. Use it to display data.                             |

</details>

<br/>

### Actions Column

`type: 'action'`

Displays any number of actions as defined below.

<details>
    <summary>Options</summary>

| Name        | Type       | Required/Default | Description                                                                                                  |
|:------------|:-----------|:-----------------|:-------------------------------------------------------------------------------------------------------------|
| `actions`   | `Object[]` | Required         | Array of action definitions. See below for action types and options.                                         |
| `condition` | `Function` | no condition     | Callback that returns a boolean value and defines whether the action will be rendered. Arguments: `(entity)` |

</details>

<details>
    <summary>Common Action Options</summary>

| Name    | Type     | Required/Default | Description                 |
|:--------|:---------|:-----------------|:----------------------------|
| `title` | `String` | Required         | String used as button text. |

</details>

#### Link Action

Displays a link as a button.

<details>
    <summary>Options</summary>

| Name           | Type                         | Required/Default | Description                                                                                                                  |
|:---------------|:-----------------------------|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------|
| `path`         | `String`                     | Required         | Path/URL template.                                                                                                           |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements)                                                                                           |
| `icon`         | `String`                     | no icon          | Name of any imported [coreui icon](https://icons.coreui.io/icons/). Read the [CoreUI Section](#coreui) for more information. |

</details>

#### Button Action

Displays a button and adds a click listener wth the passed callback.

<details>
    <summary>Options</summary>

| Name           | Type                         | Required/Default | Description                                                                                                                  |
|:---------------|:-----------------------------|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------|
| `path`         | `String`                     | Required         | Path/URL template.                                                                                                           |
| `click`        | `Function`                   | Required         | Callback that handles the button click. Arguments: `(entity, event)`                                                         |
| `replacements` | `Map<String|RegExp, String>` | no replacements  | [See replacements.](#replacements)                                                                                           |
| `icon`         | `String`                     | no icon          | Name of any imported [coreui icon](https://icons.coreui.io/icons/). Read the [CoreUI Section](#coreui) for more information. |

</details>

