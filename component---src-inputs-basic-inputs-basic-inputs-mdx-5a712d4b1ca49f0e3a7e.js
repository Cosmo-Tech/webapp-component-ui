(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{ilAi:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return v})),a.d(t,"default",(function(){return B}));var n=a("Fcif"),u=a("7L9N"),i=a("+I+c"),s=a("mXGw"),c=a("/FXl"),r=a("TjRS"),p=a("ZFoC"),l=a("0DUb"),o=a("slxr"),b=a("Jrke"),d=a("ShJi"),m=a("wpH0"),h=(a("aD51"),["components"]),v={};void 0!==v&&v&&v===Object(v)&&Object.isExtensible(v)&&!v.hasOwnProperty("__filemeta")&&Object.defineProperty(v,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/inputs/BasicInputs/BasicInputs.mdx"}});var g=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(c.b)("div",t)}},x=(g("BasicEnumInputExample"),g("BasicNumberInputExample"),g("BasicTextInputExample"),g("BasicToggleInputExample"),g("BasicDateInputExample"),{_frontmatter:v}),f=r.a;function B(e){var t,a,g,B,y,I=e.components,O=Object(i.a)(e,h);return Object(c.b)(f,Object(n.a)({},x,O,{components:I,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"basic-inputs"},"Basic Inputs"),Object(c.b)("p",null,"This part will list all basic inputs that you can use."),Object(c.b)("h2",{id:"basicenuminput"},"BasicEnumInput"),Object(c.b)("h3",{id:"props"},"Props"),Object(c.b)(p.d,{of:l.a,mdxType:"Props"}),Object(c.b)("h3",{id:"basic-usage"},"Basic Usage"),Object(c.b)(p.c,{__position:1,__code:"() => {\n  class BasicEnumInputExample extends React.Component {\n    constructor(props) {\n      super(props)\n      this.state = { value: '' }\n    }\n    changeEnumValue(value) {\n      this.setState({ value: value })\n    }\n    render() {\n      return (\n        <>\n          <BasicEnumInput\n            label=\"Here is a label\"\n            value={this.state.value}\n            changeEnumField={value => this.changeEnumValue(value)}\n            textFieldProps={{\n              id: 'basic-text-input-id',\n            }}\n            enumValues={[\n              {\n                key: 'USD',\n                value: 'A',\n              },\n              {\n                key: 'EUR',\n                value: 'Z',\n              },\n            ]}\n          />\n        </>\n      )\n    }\n  }\n  return <BasicEnumInputExample />\n}",__scope:(t={props:O,DefaultLayout:r.a,Playground:p.c,Props:p.d,BasicEnumInput:l.a,BasicNumberInput:o.a,BasicTextInput:b.a,BasicToggleInput:d.a,BasicDateInput:m.a},t.DefaultLayout=r.a,t._frontmatter=v,t),mdxType:"Playground"},(function(){var e=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={value:""},a}Object(u.a)(t,e);var a=t.prototype;return a.changeEnumValue=function(e){this.setState({value:e})},a.render=function(){var e=this;return Object(c.b)(s.Fragment,null,Object(c.b)(l.a,{label:"Here is a label",value:this.state.value,changeEnumField:function(t){return e.changeEnumValue(t)},textFieldProps:{id:"basic-text-input-id"},enumValues:[{key:"USD",value:"A"},{key:"EUR",value:"Z"}],mdxType:"BasicEnumInput"}))},t}(s.Component);return Object(c.b)(e,{mdxType:"BasicEnumInputExample"})})),Object(c.b)("h2",{id:"basicnumberinput"},"BasicNumberInput"),Object(c.b)("h3",{id:"props-1"},"Props"),Object(c.b)(p.d,{of:o.a,mdxType:"Props"}),Object(c.b)("h3",{id:"basic-usage-1"},"Basic Usage"),Object(c.b)(p.c,{__position:3,__code:"() => {\n  class BasicNumberInputExample extends React.Component {\n    constructor(props) {\n      super(props)\n      this.state = { value: '' }\n    }\n    changeNumberValue(value) {\n      this.setState({ value: value })\n    }\n    render() {\n      return (\n        <>\n          <BasicNumberInput\n            label=\"Here is a label\"\n            value={this.state.value}\n            changeNumberField={value => this.changeNumberValue(value)}\n            textFieldProps={{\n              id: 'basic-number-input-id',\n            }}\n          />\n        </>\n      )\n    }\n  }\n  return <BasicNumberInputExample />\n}",__scope:(a={props:O,DefaultLayout:r.a,Playground:p.c,Props:p.d,BasicEnumInput:l.a,BasicNumberInput:o.a,BasicTextInput:b.a,BasicToggleInput:d.a,BasicDateInput:m.a},a.DefaultLayout=r.a,a._frontmatter=v,a),mdxType:"Playground"},(function(){var e=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={value:""},a}Object(u.a)(t,e);var a=t.prototype;return a.changeNumberValue=function(e){this.setState({value:e})},a.render=function(){var e=this;return Object(c.b)(s.Fragment,null,Object(c.b)(o.a,{label:"Here is a label",value:this.state.value,changeNumberField:function(t){return e.changeNumberValue(t)},textFieldProps:{id:"basic-number-input-id"},mdxType:"BasicNumberInput"}))},t}(s.Component);return Object(c.b)(e,{mdxType:"BasicNumberInputExample"})})),Object(c.b)("h2",{id:"basictextinput"},"BasicTextInput"),Object(c.b)("h3",{id:"props-2"},"Props"),Object(c.b)(p.d,{of:b.a,mdxType:"Props"}),Object(c.b)("h3",{id:"basic-usage-2"},"Basic Usage"),Object(c.b)(p.c,{__position:5,__code:"() => {\n  class BasicTextInputExample extends React.Component {\n    constructor(props) {\n      super(props)\n      this.state = { value: '' }\n    }\n    changeTextValue(value) {\n      this.setState({ value: value })\n    }\n    render() {\n      return (\n        <>\n          <BasicTextInput\n            label=\"Here is a label\"\n            value={this.state.value}\n            changeTextField={value => this.changeTextValue(value)}\n            textFieldProps={{\n              id: 'basic-text-input-id',\n            }}\n          />\n        </>\n      )\n    }\n  }\n  return <BasicTextInputExample />\n}",__scope:(g={props:O,DefaultLayout:r.a,Playground:p.c,Props:p.d,BasicEnumInput:l.a,BasicNumberInput:o.a,BasicTextInput:b.a,BasicToggleInput:d.a,BasicDateInput:m.a},g.DefaultLayout=r.a,g._frontmatter=v,g),mdxType:"Playground"},(function(){var e=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={value:""},a}Object(u.a)(t,e);var a=t.prototype;return a.changeTextValue=function(e){this.setState({value:e})},a.render=function(){var e=this;return Object(c.b)(s.Fragment,null,Object(c.b)(b.a,{label:"Here is a label",value:this.state.value,changeTextField:function(t){return e.changeTextValue(t)},textFieldProps:{id:"basic-text-input-id"},mdxType:"BasicTextInput"}))},t}(s.Component);return Object(c.b)(e,{mdxType:"BasicTextInputExample"})})),Object(c.b)("h2",{id:"basictoggleinput"},"BasicToggleInput"),Object(c.b)("h3",{id:"props-3"},"Props"),Object(c.b)(p.d,{of:d.a,mdxType:"Props"}),Object(c.b)("h3",{id:"basic-usage-3"},"Basic Usage"),Object(c.b)(p.c,{__position:7,__code:"() => {\n  class BasicToggleInputExample extends React.Component {\n    constructor(props) {\n      super(props)\n      this.state = { value: '' }\n    }\n    changeSwitchValue(value) {\n      this.setState({ value: value })\n    }\n    render() {\n      return (\n        <>\n          <BasicToggleInput\n            label=\"Here is a label\"\n            value={this.state.value}\n            changeSwitchType={value => this.changeSwitchValue(value)}\n            textFieldProps={{\n              id: 'basic-switch-input-id',\n            }}\n          />\n        </>\n      )\n    }\n  }\n  return <BasicToggleInputExample />\n}",__scope:(B={props:O,DefaultLayout:r.a,Playground:p.c,Props:p.d,BasicEnumInput:l.a,BasicNumberInput:o.a,BasicTextInput:b.a,BasicToggleInput:d.a,BasicDateInput:m.a},B.DefaultLayout=r.a,B._frontmatter=v,B),mdxType:"Playground"},(function(){var e=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={value:""},a}Object(u.a)(t,e);var a=t.prototype;return a.changeSwitchValue=function(e){this.setState({value:e})},a.render=function(){var e=this;return Object(c.b)(s.Fragment,null,Object(c.b)(d.a,{label:"Here is a label",value:this.state.value,changeSwitchType:function(t){return e.changeSwitchValue(t)},textFieldProps:{id:"basic-switch-input-id"},mdxType:"BasicToggleInput"}))},t}(s.Component);return Object(c.b)(e,{mdxType:"BasicToggleInputExample"})})),Object(c.b)("h2",{id:"basicdateinput"},"BasicDateInput"),Object(c.b)("h3",{id:"props-4"},"Props"),Object(c.b)(p.d,{of:m.a,mdxType:"Props"}),Object(c.b)("h3",{id:"basic-usage-4"},"Basic Usage"),Object(c.b)(p.c,{__position:9,__code:"() => {\n  class BasicDateInputExample extends React.Component {\n    constructor(props) {\n      super(props)\n      this.state = { value: '09/03/2021' }\n    }\n    changeDateValue(value) {\n      this.setState({ value: value })\n    }\n    render() {\n      return (\n        <>\n          <BasicDateInput\n            value={this.state.value}\n            changeSelectedDate={value => this.changeDateValue(value)}\n            format={'MM/dd/yyyy'}\n            label={'Pick a date'}\n            dateProps={{\n              id: 'basic-date-input-id',\n              minDate: new Date('2014-01-01'),\n              maxDate: new Date('2023-01-01'),\n              minDateMessage: 'Minimum date is not respected',\n              maxDateMessage: 'Maximum date is not respected',\n              invalidDateMessage: 'Date is invalid',\n            }}\n          />\n        </>\n      )\n    }\n  }\n  return <BasicDateInputExample />\n}",__scope:(y={props:O,DefaultLayout:r.a,Playground:p.c,Props:p.d,BasicEnumInput:l.a,BasicNumberInput:o.a,BasicTextInput:b.a,BasicToggleInput:d.a,BasicDateInput:m.a},y.DefaultLayout=r.a,y._frontmatter=v,y),mdxType:"Playground"},(function(){var e=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={value:"09/03/2021"},a}Object(u.a)(t,e);var a=t.prototype;return a.changeDateValue=function(e){this.setState({value:e})},a.render=function(){var e=this;return Object(c.b)(s.Fragment,null,Object(c.b)(m.a,{value:this.state.value,changeSelectedDate:function(t){return e.changeDateValue(t)},format:"MM/dd/yyyy",label:"Pick a date",dateProps:{id:"basic-date-input-id",minDate:new Date("2014-01-01"),maxDate:new Date("2023-01-01"),minDateMessage:"Minimum date is not respected",maxDateMessage:"Maximum date is not respected",invalidDateMessage:"Date is invalid"},mdxType:"BasicDateInput"}))},t}(s.Component);return Object(c.b)(e,{mdxType:"BasicDateInputExample"})})))}void 0!==B&&B&&B===Object(B)&&Object.isExtensible(B)&&!B.hasOwnProperty("__filemeta")&&Object.defineProperty(B,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/inputs/BasicInputs/BasicInputs.mdx"}}),B.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-inputs-basic-inputs-basic-inputs-mdx-5a712d4b1ca49f0e3a7e.js.map