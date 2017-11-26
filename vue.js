var vm = new Vue({
  el: "#wattaro",
  data: {
    price: '',
    num: '',
    unit: 100,
    results: [
      { text: "ここに結果が表示されます" }
    ],
    disabled: true,
    hide_reset: true
  },
  methods: {
    checkInput: function() {
      var regexp = /^[1-9][0-9]*$/;
      if (this.price.match(regexp) && this.num.match(regexp)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    calc: function() {
      if (this.disabled) { return }
      var payLess = Math.floor(this.price / this.num / this.unit) * this.unit;
      var shortage = this.price - (payLess * this.num);
      var payMore = Math.ceil(this.price / this.num / this.unit) * this.unit;
      var remainder = Math.abs(this.price - (payMore * this.num));
      this.results = [];
      if (shortage === 0 && remainder === 0) {
        this.results.push({ text: (this.price / this.num) + '円/人' });
      } else {
        this.results.push({ text: payLess + '円/人（' + shortage +'円不足）' });
        this.results.push({ text: payMore + '円/人（' + remainder +'円余り）' });
      }
      this.hide_reset = false;
    },
    reset: function() {
      this.price = '';
      this.num = '';
      this.unit = 100;
      this.results = [{ text: "ここに結果が表示されます" }];
      this.disabled = true;
      this.hide_reset = true;
    }
  }
})
