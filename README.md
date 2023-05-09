# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm test
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## HTML to Franklin HTML

We can leverage the dita->html conversion in guides for this. 
1. The html produced should have links to other topics but the extension should not be present in the url of the topics.
2. We need to replace the <article>, <section>, <nav> etc tag with <div>.
3. Non div nodes that are directly inside <body> need to be collected and put into a <div> so that they become a section.
4.  Sections can have any number of non div nodes that will become default content in franklin, the attr info of all such tags will be lost in franklin.
5. Sections can have <div> inside, but those need to be nested <div> tags.  ```<div class="myclass">
    <div>
        <div> col1 </div>
        <div> col2 </div>
    </div>
</div>```

will create a block "myclass". The nesting can be atmost 2 levels in depth.
6. Tables need to be converted into a div based structure and need to be handled as block, "table-wrapper" can be the class to do that.
7. Any CSS/JS should be put in the git repo(like this one) and added in the head.html so that it may get included in every page.
8. A div that is a block cannot contain text directly, it must be encapsulated within a div tag.
