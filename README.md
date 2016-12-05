# todo.yml

`todo.yml` is a more structured variant of [todo.txt](http://todotxt.com/). Like
its predecessor, `todo.yml` is future proof and cross-platform because
everything is stored in a plain text YAML file. It differs in supporting project
and context nesting. This is best explained by example:

```yml
Paint the living room:
  +hardwareStore:
    - masking tape
    - paint roller
    - red paint
  +home:
    # move furniture
    - put down drop cloth
    - clean walls
    - mask trim
    - paint
Bake cookies:
  +groceryStore:
    # sugar
    # ginger
  +home:
    - clean counters
    - preheat oven
    - make dough
    - bake cookies
    - enjoy!
```

Todos can be marked complete by replacing or prepending the `-` with a `#`. This
is the same syntax for a normal YAML comment, so any text editor supporting yml
syntax highlighting will appropriately deemphasize them without the need for a
custom todo.yml plugin.

If you are from the [Getting Things Done](https://amazon.com/dp/0143126563) todo
philosophy, you can signify that elements of a list belong to a context (rather
than a project) by prepending a `+` sign.

## Tips

For completed todos, you may *optionally* keep the `- ` prefix or remove it. The
following is entirely valid and contains 2 completed todos:

```yml
Bake cookies:
  +grocery:
    # - sugar
    # ginger
```


## CLI tool

### NOT IMPLEMENTED:

The CLI tool is **NOT** implemented at the time of writing. This README is
written in the spirit of [readme driven
development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html).
You are more than welcome to use the todo.yml syntax without the CLI tool of
course. With that in mind:

### (Intended) Features

- `todoyml done[ --keep][ path/to/todo.yml][ path/to/done.yml]`

  When your todo.yml file starts to get cluttered, you can move the completed
  todos to a done.yml file (which will be created if necessary). If the
  `path/to/todo.yml` argument is omitted, the current working directory will be
  used. (This can be customized in `~/.config/todo-yml/config.json`). If the
  last argument is omitted, `done.yml` is assumed to live in the same directory
  as your `todo.yml` file.

  If removing the completed todos would leave a project or context with no
  contents, it too is removed. This behavior can be prevented by using the
  `--keep` flag when running done.


- `todoyml [project|context]`

  Sort your todo by *top-level* project or context. Projects nested within
  parent projects, and contexts nested within contexts cannot become top-level
  as the result of this command. Running `todoyml context` would convert the
  original file to the following.

  ```yml
  +hardwareStore:
    Paint the living room:
      - clean floor
      - masking tape
      - paint roller
      - red paint
  +home:
    Paint the living room:
      # move furniture
      - put down drop cloth
      - mask trim
      - paint
    Bake cookies:
      - clean counters
      - preheat oven
      - make dough
      - bake cookies
      - enjoy!
  +groceryStore:
    Bake cookies:
      # sugar
      # ginger
  ```

  Running `todoyml project` would convert it back.


- `todoyml filter "some string"`

  Filters todos which contain "some string", or who's parent project/context
  contain "some string". This selection is opened up in your `$EDITOR` (default
  `nano`). On save, the result of your edits will be merged back into the
  default `todo.yml` file. Running `todoyml filter "clean"` would return:

  ```yml
  Paint the living room:
    +home:
      - clean walls
  Spring cleaning:
    +hardwareStore:
      - contractor bags
    +home:
      - call goodwill re lawnmower
      - sweep out garage
  ```


- `todoyml grep "some regex"`

  Functions identically to `filter` but supports regex.


### Troubleshooting

If the CLI tool isn't working or is generating unexpected results, it's quite
possible you have an invalid YAML file. YAML is designed to be very
human-readable, but sometimes things aren't parsed the way you'd expect. If you
are comfortable reading JSON, but are new to YAML, I highly recommend playing
around with [this online converter](http://yaml-online-parser.appspot.com/)
which makes the syntax quite clear. Alternatively, check out the [official yaml
docs](http://yaml.org/spec/1.2/spec.html) on their site.

One easy error to make is that a list can contain sub lists **or** todos, but
not both. The following is **invalid** YAML, because `PVC pipe` is a todo, but
`Painting` is a list:

```yml
Hardware Store:
  Painting:
    - paint roller
    - red paint
  - PVC pipe
```

