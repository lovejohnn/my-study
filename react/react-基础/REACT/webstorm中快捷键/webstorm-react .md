webstorm配置

D:\A安装目录\WebStorm\WebStorm 2018.3.4

\bin\IdeaConfig\config\templates



react

state 状态获取

```
this.state.$END$
```

sst	状态设置

```
this.setState($END$);
```

ssf  状态函数设置

```
this.setState((state, props) => { return { $END$ }});
```

scu 是否要更新

```
shouldComponentUpdate(nextProps, nextState) {
        $END$
}
```

rwwd

> 在没有导入的情况下，在ES6模块系统中创建一个有构造函数、空状态、proptypes和导出的React组件类。(主要用于React时，proptype由webpack提供插件提供)

```
class $TM_FILENAME_BASE$ extends React.Component {
     constructor(props) {
         super(props);
          this.state = {};
      }
     render() {
         return (
             <div>
                         $END$
                      </div>
               );
 }
}
$TM_FILENAME_BASE$.propTypes = {
};
export default $TM_FILENAME_BASE$;
```

**rsfp** 

> 使用PropTypes将无状态的React组件作为命名函数创建

```
import React from 'react';
import PropTypes from 'prop-types';

$TM_FILENAME_BASE$.propTypes = {
  $END$
};

function $TM_FILENAME_BASE$(props) {
     return (
     <div>
                 
           </div>
       );
}
export default $TM_FILENAME_BASE$;
```

**rsf** 

> 以命名函数的形式创建无状态的React组件，不使用PropTypes

```
import React from 'react';

function $TM_FILENAME_BASE$(props) {
       return (
              <div>
                        
           </div>
       );
}

export default $TM_FILENAME_BASE$;
```

**rscp**

> 使用PropTypes和ES6模块系统创建无状态的React组件

```
import React from 'react';
import PropTypes from 'prop-types';

const $TM_FILENAME_BASE$ = props => {
  return (
           <div>
                        
           </div>
  );
};

$TM_FILENAME_BASE$.propTypes = {
   $END$
};

export default $TM_FILENAME_BASE$;
```

**rsc**  

> 创建没有PropTypes和ES6模块系统的无状态React组件

```
import React from 'react';

const $TM_FILENAME_BASE$ = () => {
     return (
              <div>
                        $END$
              </div>
       );
};

export default $TM_FILENAME_BASE$;
```

**rrc**  react redux create

> 创建一个连接到redux的React组件类

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
     return {

      };
}

class $TM_FILENAME_BASE$ extends Component {
   render() {
         return (
                   <div>
                                $END$
                 </div>
               );
 }
}

export default connect(
   mapStateToProps,
)($TM_FILENAME_BASE$);
```



rpc   react proptypes create

> 使用PropTypes和ES6模块系统创建一个React纯组件类

```
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class $TM_FILENAME_BASE$ extends PureComponent {
        render() {
         return (
             <div>
                         $END$
                      </div>
               );
 }
}

$TM_FILENAME_BASE$.propTypes = {

};

export default $TM_FILENAME_BASE$;
```



**rcjc**  reacte class 简单 create

> 使用ES6模块系统创建React组件类

```
class $TM_FILENAME_BASE$ extends Component {
   render() {
         return (
     <div>
                         $END$
                      </div>
               );
 }
}

```

**rccp**  react class create proptypes

> 使用PropTypes和ES6模块系统创建React组件类

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class $TM_FILENAME_BASE$ extends Component {
       render() {
         return (
                   <div>
                           $END$
                      </div>
               );
 }
}

$TM_FILENAME_BASE$.propTypes = {

};

export default $TM_FILENAME_BASE$;
```

**rcc**  react class craete

> 使用ES6模块系统创建React组件类

```
import React, { Component } from 'react';

class $TM_FILENAME_BASE$ extends Component {
  render() {
         return (
                   <div>
                                $END$
</div>
                );
 }
}

export default $TM_FILENAME_BASE$;
```






