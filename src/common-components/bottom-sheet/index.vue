<template>
  <div ref="bottomSheet"
    :class="[
      'bottom-sheet',
      {
        opened: opened,
        closed: opened === false,
        moving: moving
      }
    ]"
    :style="{ 'pointer-events': backgroundClickable && clickToClose === false ? 'none' : 'all' }"
    v-on="handlers"
  >
    <transition name="fade">
      <div v-if="overlay" ref="bottomSheetBackdrop" class="bottom-sheet__backdrop"  v-on="handlers" />
    </transition>

    <div
      ref="bottomSheetCard"
      :style="cardStyle"
      :class="[
        'bottom-sheet__card',
        { stripe: stripe, square: !rounded },
        effect
      ]"
    >
      <div ref="pan" class="bottom-sheet__pan" @mouseup="close" >
        <div class="bottom-sheet__bar" />
      </div>

      <div
        v-if="hasScroll"
        ref="bottomSheetCardContent"
         
        class="bottom-sheet__content"
      >
        <div class="bottom-sheet__scroll">
          <div class="bottom-sheet__content-inner">
            <div class="bottom-sheet__container">
              <slot :is-bottom-sheet-opened="opened" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        ref="bottomSheetCardContent"
        class="bottom-sheet__content"
      >
        <slot :is-bottom-sheet-opened="opened" />
      </div>
      <slot name="bottom-fixed" />
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'

export default {
  name: 'bottom-sheet',
  provide () {
    return {
      hammer: this.hammer
    }
  },
  inject: {
    parentHammer: {
      from: 'hammer',
      default: () => ({})
    }
  },
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: '100%'
    },
    maxHeight: {
      type: String,
      default: '95%'
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    effect: {
      type: String,
      default: 'fx-default'
    },
    rounded: {
      type: Boolean,
      default: true
    },
    swipeAble: {
      type: Boolean,
      default: true
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
     
    backgroundScrollable: {
      type: Boolean,
      default: false
    },
    backgroundClickable: {
      type: Boolean,
      default: false
    },
    hasScroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const vm = this

    return {
      inited: false,
      opened: false,
      contentH: 'auto',
      hammer: {
        pan: null,
        content: null
      },
      contentScroll: 0,
      cardP: null,
      cardH: null,
      moving: false,
      stripe: 0,
      height: '',
      handlers: {
        mouseup: vm.clickOnBottomSheet,
        touchend: vm.clickOnBottomSheet
      }
    }
  },
  
  computed: {
    cardStyle () {
      return {
        bottom: this.cardP+'px',
        maxWidth: this.maxWidth,
        maxHeight: this.height || this.maxHeight,
        height: this.isFullScreen ? '100%' : 'auto',
        'pointer-events': 'all'
      }
    }
  },
   
  beforeDestroy () {
    this.hammer?.pan?.destroy()
    this.hammer?.content?.destroy()
  },

  methods: {

    isIphone () {
      let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream
      let aspect = window.screen.width / window.screen.height

      return iPhone && aspect.toFixed(3) === '0.462'
    },

    move (event, type) {
      if (this.swipeAble) {
        let delta = -event.deltaY

        if (
          (type === 'content' && event.type === 'panup') ||
          (type === 'content' && event.type === 'pandown' && this.contentScroll > 0)
        ) {
          this.$refs.bottomSheetCardContent.scrollTop = this.contentScroll + delta
        } else if (event.type === 'panup' || event.type === 'pandown') {
          this.moving = true
          if (event.deltaY > 0) {
            this.cardP = delta
          }
        }
        if (event.isFinal) {
          this.contentScroll = this.$refs.bottomSheetCardContent.scrollTop
          this.moving = false
          if (this.cardP < -30) {
            this.opened = false
            this.cardP = -this.cardH - this.stripe
            document.body.style.overflow = ''

            this.switchParentHammer(true)

            
          } else {
            this.cardP = 0
          }
        }
      }
    },

    init () {
      return new Promise(resolve => {
        this.contentH = 'auto'
        this.stripe = this.isIphone() ? 20 : 0
        this.cardH = this.$refs.bottomSheetCard.clientHeight
        this.contentH = `${this.cardH - this.$refs.pan.clientHeight}px`
        this.$refs.bottomSheetCard.style.maxHeight = this.getMaxHeight
        this.cardP =
          this.effect === 'fx-slide-from-right' ||
          this.effect === 'fx-slide-from-left'
            ? 0
            : -this.cardH - this.stripe
        if (!this.inited) {
          this.inited = true
          const options = {
            recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]
            ]
          }

          this.hammer.pan = new Hammer(this.$refs.pan, options)
          //this.hammer.content = new Hammer(this.$refs.bottomSheetCardContent, options)

          this.hammer.pan.on('panstart panup pandown panend', e => {
            this.move(e, 'pan')
          })
          // this.hammer.content.on('panstart panup pandown panend', e => {
          //   this.move(e, 'content')
          // })
        }
        setTimeout(() => {
          resolve()
        }, 10)
      })
    },

    async open () {
      await this.init()

      

      this.opened = true
      this.cardP = 0

      if (!this.backgroundScrollable) {
        document.body.style.overflow = 'hidden'
      }

      this.switchParentHammer(false)

      this.$emit('opened')
    },

    close () {
      this.opened = false
      this.cardP =
        this.effect === 'fx-slide-from-right' ||
        this.effect === 'fx-slide-from-left'
          ? 0
          : -this.cardH - this.stripe
      document.body.style.overflow = ''

      this.switchParentHammer(true)
      this.$emit('closed')

      const scrollBar = this.$refs.bottomSheet.querySelector('.vb-visible')

      if (scrollBar) {
        scrollBar.querySelector('.vb-content').scrollTo(0, 0)
      }
    },

    clickOnBottomSheet (event) {

      if (this.clickToClose && (event.target === this.$refs.bottomSheet) || (event.target === this.$refs.bottomSheetBackdrop)) {
        this.close()
      }
    },

    switchParentHammer (enable = false) {
      const { pan, content } = this.parentHammer

      if (pan instanceof Hammer.Manager) {
        pan.set({ enable })
      }

      if (content instanceof Hammer.Manager) {
        content.set({ enable })
      }
    },
    async updateContent () {
      await this.$nextTick()
      this.height = '80vh'
      await this.$nextTick()
      this.height = ''
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />
