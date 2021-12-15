#### 基本 title 显示

```jsx
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
function Demo() {
  return (
    <div>
      <Title>用户价值组报表</Title>
    </div>
  );
}
<Demo />;
```

#### 带 extraContent 的内容显示

```jsx
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
function Demo() {
  return (
    <div>
      <Title
        extraContent={
          <Button onClick={() => message.success('右侧自定义内容')}>
            设置
          </Button>
        }
      >
        用户属性
      </Title>
    </div>
  );
}
<Demo />;
```

#### 带 tooltip 的内容显示,以及样式设定

```jsx
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
function Demo() {
  return (
    <div>
      <Title tooltip="符串显示tooltip内容" style={{ marginBottom: 20 }}>
        字符串显示tooltip内容
      </Title>
      <Title tooltip={<div>jsx显示tooltip内容</div>} style={{ color: 'red' }}>
        jsx显示tooltip内容
      </Title>
    </div>
  );
}
<Demo />;
```

#### 表格常用 tooltip

```jsx
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
function Demo() {
  return (
    <Title
      tooltip="字符串显示tooltip内容"
      showLeftLine={false}
      style={{
        color: 'rgba(0,0,0,0.65)',
        fontWeight: 400,
        fontSize: 14,
      }}
    >
      字符串显示tooltip内容
    </Title>
  );
}
<Demo />;
```
