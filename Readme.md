
# json-to-dom

  Fill in DOM nodes with JSON (jQuery Plugin). Supports arrays and attributes.
  This was written from scratch with jQuery based on [MatthewMueller][1]'s ideas. But restricted to Key/Value to add major versatility and reach.

## Example

```html
<div class="note">
  <p class="title">title</p>
  <ul class="tags">
    <li class="tag">
      <span class="name">tag</span>
    </li>
  </ul>
</div>
```

```js
var json = {
	title : 'JavaScript',
	tags : [
		{ tag: { name : 'programming' } },
		{ tag: { name : 'jQuery' } }
	]
};
var jsonToDom = new $.jsonToDom();
jsonToDom.render('.note', json);
```

outputs:

```html
<div class="note">
  <p class="title">JavaScript</p>
  <ul class="tags">
    <li class="tag">
      <span class="name">programming</span>
    </li>
    <li class="tag">
      <span class="name">jQuery</span>
    </li>
  </ul>
</div>
```

## Motivation

It's simpler and more flexible than most templating / binding engines.

## Design

### Objects

#### json-to-dom will fill in the classes it finds in the block using the object's keys:

#### Example 2

```html
<div class="email">
  <div class="subject">subject</div>
  <div class="from">from</div>
  <div class="to">to</div>
  <div class="message">message</div>
</div>
```

```js
var email = {
  subject : 'You inherited $11.3 million from the death of your uncle',
  from : 'money@nigeria.com',
  to : 'matt@matt.com',
  message : 'Reply with your bank credentials so we can send you the money'
};
var jsonToDomEmail = new $.jsonToDom();
jsonToDomEmail.render('.email', email);

```

outputs:

```html
<div class="email">
  <div class="subject">You inherited $11.3 million from the death of your uncle</div>
  <div class="from">money@nigeria.com</div>
  <div class="to">matt@matt.com</div>
  <div class="message">Reply with your bank credentials so we can send you the money</div>
</div>
```

### Arrays

#### Example 2
```html
<div class="book">
	<textarea class="chapter">chapter</textarea>
</div>
```

```js
var book = [
	{ chapter : "111111" },
	{ chapter : "222222" },
	{ chapter : "333333" }
];
var jsonToDomBook = new $.jsonToDom();
jsonToDomBook.render('.book', book);
```
outputs:

```html
<div class="book">
	<textarea class="chapter">111111</textarea>
	<textarea class="chapter">222222</textarea>
	<textarea class="chapter">333333</textarea>
</div>
```

### Setting attributes

#### json-to-dom will also work with standard attributes.
Note: Value must be a valid stringified json representation.

#### Example 3

```html
<select class="testSel">
	<option class="testOpt">optText</option>
</select>
```

```js
var jsonSel = [
	{ testOpt : "{\"value\":\"1\",\"text\":\"One\"}" },
	{ testOpt : "{\"value\":\"2\",\"text\":\"Two\"}" }
];
var jsonToDomSel = new $.jsonToDom();
jsonToDomSel.render('.testSel', jsonSel);
```

outputs:

```html
<select class="testSel">
    <option class="testOpt" value="1" text="One">One</option>
    <option class="testOpt" value="2" text="Two">Two</option>
</select>
```

#### Example 4

```html
<div class="testOthers">
	<a class="testAnchor">testAnchor</a>
	<img class="testImg"/>
	<button class="testButton">testButton</button>
</div>
```

```js
var jsonOthers = {
	testAnchor : "{\"href\":\"https://github.com/gescript/json-to-dom\",\"title\":\"jQuery json-to-dom\",\"text\":\"jQuery json-to-dom\"}" ,
	testImg : "{\"src\":\"./img/dotsLine.gif\",\"alt\":\"Dots line\",\"title\":\"Dots line Image\"}",
	testButton : " Test Button "
};
var jsonToDomOthers = new $.jsonToDom();
jsonToDomOthers.render('.testOthers', jsonOthers);
```

outputs:

```html
<div class="testOthers">
	<a class="testAnchor" href="https://github.com/gescript/json-to-dom" title="jQuery json-to-dom" text="jQuery json-to-dom">jQuery json-to-dom</a>
	<img class="testImg" src="./img/dotsLine.gif" alt="Dots line" title="Dots line Image">
	<button class="testButton"> Test Button </button>
</div>
```

## License

  MIT


  [1]: https://github.com/MatthewMueller/json-to-dom