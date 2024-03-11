(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-837e740e"],{"0373":function(t,o,a){},"7db0":function(t,o,a){"use strict";var r=a("23e7"),i=a("b727").find,e=a("44d2"),n="find",c=!0;n in[]&&Array(1)[n]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),e(n)},"9a0b":function(t,o,a){"use strict";a.r(o);var r=function(){var t=this,o=t.$createElement,a=t._self._c||o;return a("div",{staticClass:"container"},[a("div",{attrs:{id:"carrito"}},[a("h2",[t._v("Carrito")]),a("table",{staticClass:"table"},[t._m(0),a("tbody",[t._l(t.carrito,(function(o,r){return a("tr",{key:r},[a("td",[t._v(t._s(o.nombre))]),a("td",[t._v(t._s(o.precioU))]),a("td",[t._v(" "+t._s(o.cantidad)+" "),a("button",{staticClass:"btn btn-success mx-1",on:{click:function(a){return t.aumentarCarrito(o.id)}}},[t._v("+")]),a("button",{staticClass:"btn btn-success",on:{click:function(a){return t.disminuirCarrito(o.id)}}},[t._v("-")])]),a("td",[t._v(t._s(o.subTotal)+" "),a("button",{staticClass:"btn btn-danger",on:{click:function(a){return t.borrarCarrito(o.id)}}},[t._v("Borrar")])])])})),a("tr",[a("td",[t._v("Total: "+t._s(t.total)+" MXN")]),a("td"),a("td"),a("td",[a("b-button",{attrs:{id:"show-btn"},on:{click:t.showModal}},[t._v("Pagar")])],1)])],2)]),a("b-modal",{ref:"ventana-pago",attrs:{"hide-footer":"",title:"Confirmación de pago"}},[a("div",{staticClass:"d-block text-center"},[a("h1",[t._v("Total: "+t._s(t.total)+" MXN")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.recibo,expression:"recibo"}],staticClass:"form-control",attrs:{type:"number",placeholder:"Recibo MXN"},domProps:{value:t.recibo},on:{input:function(o){o.target.composing||(t.recibo=o.target.value)}}}),a("p",[t._v("Cambio: "+t._s(t.recibo-t.total)+" MXN")]),a("b-button",{staticClass:"mx-2",attrs:{variant:"outline-success",block:""},on:{click:function(o){return t.pagar()}}},[t._v("Confirmar Pago")]),a("b-button",{attrs:{variant:"outline-danger",block:""},on:{click:t.hideModal}},[t._v("Cancelar")])],1)])],1),a("h2",[t._v("Menú")]),a("label",[t._v("Mostrar:")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.mostrar,expression:"mostrar"}],staticClass:"form-control m-2",on:{change:function(o){var a=Array.prototype.filter.call(o.target.options,(function(t){return t.selected})).map((function(t){var o="_value"in t?t._value:t.value;return o}));t.mostrar=o.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"Todo"}},[t._v("Todo")]),a("option",{attrs:{value:"Alimentos"}},[t._v("Alimentos")]),a("option",{attrs:{value:"Bebidas"}},[t._v("Bebidas")]),a("option",{attrs:{value:"Reposteria"}},[t._v("Reposteria")]),a("option",{attrs:{value:"OTROS"}},[t._v("Otros")])]),a("div",{attrs:{id:"cards"}},t._l(t.productos,(function(o,r){return a("div",{key:r,attrs:{id:"card"}},[o.categoria==t.mostrar||"Todo"==t.mostrar?a("b-card",{staticClass:"m-2",staticStyle:{"max-width":"15rem"},attrs:{title:o.nombre,"img-src":"https://postrescharly.com/uploads/"+o.image,"img-top":"",tag:"article"}},[a("b-card-text",[t._v(t._s(o.descripcion)+" ")]),a("b-card-text",[t._v(t._s(o.precioUnitario)+" MXN ")]),a("b-button",{attrs:{variant:"primary"},on:{click:function(a){return t.agregarCarrito(o)}}},[t._v("Añadir a la orden")])],1):t._e()],1)})),0)])},i=[function(){var t=this,o=t.$createElement,a=t._self._c||o;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Nombre")]),a("th",{attrs:{scope:"col"}},[t._v("Precio")]),a("th",{attrs:{scope:"col"}},[t._v("Cantidad")]),a("th",{attrs:{scope:"col"}},[t._v("Subtotal")])])])}],e=a("5530"),n=(a("d3b7"),a("7db0"),a("4de4"),a("a434"),a("2f62")),c={data:function(){return{productos:[],totalProductos:0,mostrar:"Todo",carrito:[],total:0,recibo:0,cambio:0}},computed:Object(e["a"])({},Object(n["d"])(["token","usuarioDB"])),methods:{listarProductos:function(){var t=this,o={headers:{token:this.token}};this.axios.get("producto/ver-todos",o).then((function(o){t.productos=o.data.productoDB,console.log(t.productos)})).catch((function(t){console.log(t.response)}))},calcularTotal:function(){this.total=this.carrito.reduce((function(t,o){return t+o.subTotal}),0)},agregarCarrito:function(t){var o={id:t._id,nombre:t.nombre,existencia:t.existencia,costoU:t.costoUnitario,precioU:t.precioUnitario,cantidad:1,subCostoU:0,subTotal:0},a=this.carrito.find((function(o){return o.id===t._id}));a?(console.log("El elemento ya existe"),a.cantidad+=1,a.subCostoU=a.costoU*a.cantidad,a.subTotal=a.precioU*a.cantidad,this.calcularTotal()):(o.subCostoU=o.costoU*o.cantidad,o.subTotal=o.precioU*o.cantidad,this.carrito.push(o),this.calcularTotal())},aumentarCarrito:function(t){var o=this.carrito.find((function(o){return o.id===t}));console.log(o),o.cantidad++,o.subCostoU=o.costoU*o.cantidad,o.subTotal=o.precioU*o.cantidad,this.calcularTotal()},disminuirCarrito:function(t){var o=this.carrito.find((function(o){return o.id===t}));console.log(o),o.cantidad--,o.subCostoU=o.costoU*o.cantidad,o.subTotal=o.precioU*o.cantidad,this.calcularTotal()},borrarCarrito:function(t){console.log(t),this.carrito=this.carrito.filter((function(o){return o.id!==t})),this.calcularTotal()},pagar:function(){var t=this,o=this.carrito.reduce((function(t,o){return t+o.subCostoU}),0),a=this.total-o,r={usuarioId:this.usuarioDB.data._id,usuarioNombre:this.usuarioDB.data.nombre,orden:this.carrito,costoTotal:o,precioTotal:this.total,utilidad:a},i={headers:{token:this.token}};this.axios.post("/venta/nuevo",r,i).then((function(o){console.log(o.data),t.carrito.splice(0,t.carrito.length),t.total=0,t.recibo=0,t.cambio=0,t.hideModal(),alert("venta exitosa")})).catch((function(t){console.log(t.response),alert("La venta no se concreto correctamente, favor de notificar")})).finally((function(){t.listarProductos()}))},showModal:function(){this.$refs["ventana-pago"].show()},hideModal:function(){this.$refs["ventana-pago"].hide()}},created:function(){this.listarProductos()}},s=c,l=(a("a2e6"),a("2877")),d=Object(l["a"])(s,r,i,!1,null,"31e90935",null);o["default"]=d.exports},a2e6:function(t,o,a){"use strict";a("0373")},a434:function(t,o,a){"use strict";var r=a("23e7"),i=a("da84"),e=a("23cb"),n=a("5926"),c=a("07fa"),s=a("7b0b"),l=a("65f0"),d=a("8418"),u=a("1dde"),b=u("splice"),f=i.TypeError,v=Math.max,h=Math.min,p=9007199254740991,m="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!b},{splice:function(t,o){var a,r,i,u,b,_,g=s(this),C=c(g),T=e(t,C),k=arguments.length;if(0===k?a=r=0:1===k?(a=0,r=C-T):(a=k-2,r=h(v(n(o),0),C-T)),C+a-r>p)throw f(m);for(i=l(g,r),u=0;u<r;u++)b=T+u,b in g&&d(i,u,g[b]);if(i.length=r,a<r){for(u=T;u<C-r;u++)b=u+r,_=u+a,b in g?g[_]=g[b]:delete g[_];for(u=C;u>C-r+a;u--)delete g[u-1]}else if(a>r)for(u=C-r;u>T;u--)b=u+r-1,_=u+a-1,b in g?g[_]=g[b]:delete g[_];for(u=0;u<a;u++)g[u+T]=arguments[u+2];return g.length=C-r+a,i}})}}]);
//# sourceMappingURL=chunk-837e740e.29c43ae6.js.map