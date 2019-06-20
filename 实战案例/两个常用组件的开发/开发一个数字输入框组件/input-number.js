//正则匹配是否是正负数或者零
function isValueNumber (value) {
  return (/(^-?[0,9]+\.{1}\d+$)|(^-?[1-9][1-9]*$)|(^-?0{1}$)/).test(value + '');
}
Vue.component("input-number", {
  template: 
  '<div class="input-number">\
    <input type="text" :value="currentValue" @change="handleChange">\
    <button @click="handleReduce" :disabled="currentValue <= min">-</button>\
    <button @click="handleAdd" :disabled="currentValue >= max">+</button>\
  </div>',
  props: {
    value: {  //初始值
      type: Number,
      default: 0
    },
    max: {  //最大值
      type: Number,
      default: Infinity
    },
    min: {  //最小值
      type: Number,
      default: -Infinity
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val);
      this.$emit('on-change', val); //用于告知父组件数字输入框值有所改变。
    },
    value(val) {
      this.updatedValue(val)
    }
  },
  methods: {
    handleReduce() {
      if(this.currentValue <= this.min) return;
      this.currentValue -= 1;
    },
    handleAdd() {
      if(this.currentValue >= this.max) return;
      this.currentValue += 1;
    },
    handleChange(e) {
      var val = e.target.value.trim();

      var max = this.max;
      var min = this.min;
      // 如果是符合要求的数字，就把输入的值赋给currentValue
      if(isValueNumber(val)) {
        val = Number(val)
        this.currentValue = val;
        if(val > max) {
          this.currentValue = max;
        }else if (val < min) {
          this.currentValue = min;
        }
      // 如果不是数字，就将输入的内容重置为之前的currentValue
      }else {
        e.target.value = this.currentValue;
      }
    },
    //过滤更新传入的value值
    updatedValue(val) {
      if(val > this.max) val = this.max;
      if(val < this.min) val = this.min;
      this.currentValue = val;
    }
  },
  mounted () {
    this.updatedValue(this.value);
  }
})