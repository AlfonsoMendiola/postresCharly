(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(a,e,s){"use strict";s.r(e);var t=function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"container"},[s("h1",[a._v("Login")]),s("form",{on:{submit:function(e){return e.preventDefault(),a.login.apply(null,arguments)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.usuario.email,expression:"usuario.email"}],staticClass:"form-control my-2",attrs:{type:"email",placeholder:"Email"},domProps:{value:a.usuario.email},on:{input:function(e){e.target.composing||a.$set(a.usuario,"email",e.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:a.usuario.pass,expression:"usuario.pass"}],staticClass:"form-control my-2",attrs:{type:"password",placeholder:"Contraseña"},domProps:{value:a.usuario.pass},on:{input:function(e){e.target.composing||a.$set(a.usuario,"pass",e.target.value)}}}),a._m(0)]),""!==a.mensaje?s("div",[s("p",[a._v(a._s(a.mensaje))])]):a._e()])},n=[function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"d-grid gap-2"},[s("button",{staticClass:"btn btn-success my-2",attrs:{type:"submit"}},[a._v("Acceder")])])}],o=s("5530"),i=s("2f62"),r={data:function(){return{usuario:{email:"",pass:""},mensaje:""}},methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])(["guardarUsuario"])),{},{login:function(){var a=this;this.axios.post("/login",this.usuario).then((function(e){console.log(e.data);var s=e.data.token;a.guardarUsuario(s),a.mensaje="",a.$router.push({name:"Menu"})})).catch((function(e){console.log(e.response),a.mensaje=e.response.data.mensaje}))}})},u=r,l=s("2877"),c=Object(l["a"])(u,t,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.9fc885d0.js.map