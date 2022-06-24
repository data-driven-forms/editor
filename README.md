- [Data Driven Forms Pro Editor](#data-driven-forms-pro-editor)
- [Packages](#packages)
  - [dnd](#dnd)
  - [editor-core](#editor-core)
  - [editor-pro](#editor-pro)
  - [evergreen-component-mapper](#evergreen-component-mapper)
- [Available Scripts](#available-scripts)
  - [`npm install`](#npm-install)
  - [`npm bootstrap`](#npm-bootstrap)

:warning: **THIS IS WIP REPOSITORY!** :warning:
# Data Driven Forms Pro Editor

Drag and Drop editor for building [Data Driven Forms](https://github.com/data-driven-forms/react-forms).

# Packages

## [dnd](./packages/dnd/)

Drag and Drop system powering the editor.

- Touch support
- Nesting support
- Supporting any kind of storage (useReducer, redux, etc.)
- Custom "backend" => everything is controlled in JS and React

Roadmap

- [ ] keyboard support

## [editor-core](./packages/editor-core/)

A set of utilities for building Data Driven Forms editors. Using these components and hooks you can easily build and customize your own editor in short time.

## [editor-pro](./packages/editor-pro/)

An implementation of editor using `editor-core` utilities. Using [Evergreen-ui](https://github.com/segmentio/evergreen) to look neutral when using with other mappers.

- Supports all mappers

## [evergreen-component-mapper](./packages/evergreen-component-mapper/)

Set of basic components to power `editor-pro` properties editor. [See more](https://github.com/segmentio/evergreen).

# Available Scripts

In the project directory, you can run:

## `npm install`

## `npm bootstrap`

