### 代码演示

#### 1.基本用法

```js
<div>
  <LongText text="gda22j" limit={5} overlayStyle={{maxWidth: 200}} />
</div>
```

####  2.带html标签的字符串
```js
const text = '<span>prompt text</span>';
<div>
  <LongText text={text} type="tooltip" limit={5} overlayStyle={{maxWidth: 200}} />
</div>
```

