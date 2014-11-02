function module(t){try{return angular.module(t)}catch(e){return angular.module(t,[])}}angular.module("yatayat",["ionic","ngCordova","yatayat.factories","yatayat.controllers"]).run(["$ionicPlatform","$rootScope","Loading",function(t,e,o){t.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault(),e.$on("loading:show",function(){o.show()}),e.$on("loading:hide",function(){o.hide()})})}]).config(["$httpProvider",function(t){t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",t.interceptors.push(["$rootScope",function(t){return{request:function(e){return t.$broadcast("loading:show"),e},response:function(e){return t.$broadcast("loading:hide"),e}}}])}]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/start"),t.state("start",{url:"/start",templateUrl:"templates/start.html",controller:"StartCtrl"}).state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.posts",{url:"/posts",views:{menuContent:{templateUrl:"templates/posts.html",controller:"PostsCtrl"}}}).state("app.post",{url:"/posts/:postId",views:{menuContent:{templateUrl:"templates/post.html",controller:"PostCtrl"}}}).state("app.report",{url:"/report",views:{menuContent:{templateUrl:"templates/report.html",controller:"ReportCtrl"}}}).state("app.search",{url:"/search",views:{menuContent:{templateUrl:"templates/search.html",controller:"SearchCtrl"}}})}]),module("yatayat.controllers").controller("AppCtrl",["$scope","$rootScope","Modal","$timeout",function(t,e,o,n){t.loginData={},o.setup(t,"templates/login.html"),t.login=function(){t.showModal()},t.closeLogin=function(){t.closeModal()},t.doLogin=function(){console.log("Doing login",t.loginData),n(function(){t.closeLogin()},1e3)}}]),module("yatayat.controllers").controller("PostCtrl",["$scope","$stateParams","Post",function(t,e,o){t.post={},o.get(e.postId).then(function(e){t.post=e})}]),module("yatayat.controllers").controller("PostsCtrl",["$scope","Post",function(t,e){e.all().then(function(e){t.posts=e}),t.likePost=function(t,e){e.preventDefault()},t.editPost=function(t,e){e.preventDefault()}}]),module("yatayat.controllers").controller("ReportCtrl",["$scope","$stateParams",function(){}]),module("yatayat.controllers").controller("SearchCtrl",["$scope","$stateParams",function(){}]),module("yatayat.controllers").controller("StartCtrl",["$scope","$rootScope","User","Sim","Modal","Navigator","$ionicPopup","Validator",function(t,e,o,n,r,a,i){r.setup(t,"templates/tos.html"),t.enterMain=function(t){e.userId=t,a.go("app.posts",!0)},o.checkRegistration().then(function(e){t.enterMain(e.sim_serial_number)},function(){}),t.registerWithCredentials=function(e,n){o.register(e,n).then(function(){i.alert({title:"Success",template:e+" registered successfully."}).then(function(){t.enterMain(e)})})},t.register=function(){n.getDetails().then(function(e){t.registerWithCredentials(e.simSerialNumber,e.line1Number)})}}]),module("yatayat.factories").factory("BaseModel",[function(){return{build:function(t){var e=Object.create(this);return angular.extend(e,t),e}}}]),module("yatayat.factories").factory("Loading",["$ionicLoading",function(t){return{show:function(){t.show({template:"<img src='img/spinner.gif'>"})},hide:function(){t.hide()}}}]),module("yatayat.factories").factory("Modal",["$ionicModal",function(t){return{setup:function(e,o){t.fromTemplateUrl(o,{scope:e}).then(function(t){e.modal=t}),e.closeModal=function(){e.modal.hide()},e.showModal=function(){e.modal.show()}}}}]),module("yatayat.factories").factory("Navigator",["$state","$ionicViewService",function(t,e){return{go:function(o,n){t.go(o).then(function(){n&&e.clearHistory()})}}}]),module("yatayat.factories").factory("Post",["BaseModel","Raven","$q",function(t,e,o){return angular.extend(t,{all:function(){var n=o.defer(),r=[];return e.get("posts").then(function(e){angular.forEach(e,function(e){r.push(t.build(e))}),n.resolve(r)},function(){n.reject()}),n.promise},get:function(n){var r=o.defer();return e.get("posts/"+n).then(function(e){r.resolve(t.build(e))},function(){r.reject()}),r.promise},create:function(){},length:function(){return this.body.length}})}]),module("yatayat.factories").factory("Raven",["$http","$q",function(t,e){var o="http://192.168.1.5:3000/";return{get:function(n){var r=e.defer();return t({url:o+n,method:"GET"}).then(function(t){r.resolve(t.data)},function(){r.reject()}),r.promise},post:function(n,r){var a=e.defer();return t({url:o+n,method:"POST",data:$.param(r)}).then(function(t){a.resolve(t.data)},function(){a.reject()}),a.promise}}}]),module("yatayat.factories").factory("Sim",["$q",function(t){return{getDetails:function(){var e=t.defer();if("undefined"!=typeof cordova){var o=cordova.require("cordova/plugin/telephonenumber");o.get(function(t){e.resolve(t)})}else e.resolve({simSerialNumber:"nanu",line1Number:"9808640957"});return e.promise}}}]),module("yatayat.factories").factory("User",["Raven","$q","Sim",function(t,e,o){return{checkRegistration:function(){var n=e.defer();return o.getDetails().then(function(e){t.get("users/"+e.simSerialNumber).then(function(t){t.id?n.resolve(t):n.reject()},function(){n.reject()})}),n.promise},register:function(o,n){var r=e.defer(),a={};return a.sim_serial_number=o,n&&(a.phone_number=n),t.post("users",{user:a}).then(function(t){t.id?r.resolve(t):r.reject()},function(){r.reject()}),r.promise}}}]),module("yatayat.factories").factory("Validator",[function(){return{isValidPhone:function(t){var e=/^\d{10}$/;return t.match(e)}}}]);