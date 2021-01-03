
let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    if (VueRouter.install.installed) {
      return
    }

    VueRouter.install.installed = true;

    _Vue = Vue;


    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init();
        }
      }
    })
  }

  constructor(optiosn) {
    this.optiosn = optiosn;
    this.routeMap = new Map();
    this.data = _Vue.observable({ current: this.isHistory() ? window.location.pathname : window.location.hash.replace('#', '')});
  }

  isHistory() {
    return this.optiosn.mode === 'history';
  }

  init() {
    this.initRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }

  initRouteMap() {
    this.optiosn.routes.forEach(route => {
      this.routeMap.set(route.path, route.component);
    })
  }

  initComponent(Vue) {
    const _this = this;
    Vue.component('router-link', {
      props: {
        to: String
      },

      render(h) {
        return h('a', {
          attrs: {
            href: _this.isHistory() ? this.to : `/#${this.to}`
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      
      methods: {
        clickHandler(e) {
          e.preventDefault();

          if (_this.isHistory()) {
            window.history.pushState({}, '', this.to)
          } else {
            window.location.hash = this.to;
          }
        }
      }
    })

    Vue.component('router-view', {
      render(h) {
        return h(_this.routeMap.get(_this.data.current))
      }
    })
  }

  initEvent() {
    if (this.isHistory()) {
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname;
      })
    } else {
      window.addEventListener('hashchange', () => {
        this.data.current = window.location.hash.replace('#', '');
      })
    }
  }
}