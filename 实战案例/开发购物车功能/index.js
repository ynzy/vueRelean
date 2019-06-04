var app = new Vue({
    el: '#app',
    data: {
        shoplists: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1
            }, {
                id: 2,
                name: 'iPhone 8',
                price: 7522,
                count: 1
            }, {
                id: 3,
                name: 'iPhone pro',
                price: 8899,
                count: 1
            }, {
                id: 4,
                name: 'MacBook ',
                price: 21488,
                count: 1
            },
        ],
        checklist: [],  //单选数据，计算选择的价格
        checkboxModel: [],  //全选对应的id
        checked: false

    },
    watch: {//深度 watcher
        'checkboxModel': {
            handler: function (val, oldVal) {
                if (this.checkboxModel.length === this.shoplists.length) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            },
            deep: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.shoplists.forEach(item => {
                total += item.price * item.count
            });
            //转换字符串，返回匹配千分隔数字
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        },
        checkPrice() {
            let total = 0;
            this.checklist.forEach(item => {
                total += item.price * item.count
            })
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        }
    },
    methods: {
        handleReduce(index) {
            if (this.list[index].count === 1) return
            this.shoplists[index].count--;
        },
        handleAdd(index) {
            this.shoplists[index].count++;
        },
        handleRemove(index) {
            this.shoplists.splice(index, 1)
        },
        checkedchoice(item) {
            console.log(item)
            this.checklist.push(item)
        },
        checkedAll() {
            console.log(this.checked)
            if (this.checked) {//实现反选
                this.checkboxModel = [];
                this.checklist = []
            } else {//实现全选
                this.checkboxModel = [];
                this.shoplists.forEach((item) => {
                    this.checkboxModel.push(item.id);
                });
                this.checklist = this.shoplists
            }
        }
    }
})