var app = new Vue({
    el: '#app',
    data: {
        shoplists: [{
            name: '电子产品',
            productList: [
                {
                    id: 1,
                    name: 'iPhone 7',
                    price: 6188,
                    count: 1,
                    status: 0
                }, {
                    id: 2,
                    name: 'iPhone 8',
                    price: 7522,
                    count: 1,
                    status: 0
                }, {
                    id: 3,
                    name: 'iPhone pro',
                    price: 8899,
                    count: 1,
                    status: 0
                }, {
                    id: 4,
                    name: 'MacBook ',
                    price: 21488,
                    count: 1,
                    status: 0
                },
            ],

        },
        {
            name: '蔬菜水果',
            productList: [
                {
                    id: 1,
                    name: '苹果',
                    price: 3,
                    count: 1,
                    status: 0
                }, {
                    id: 2,
                    name: '白菜',
                    price: 1,
                    count: 1,
                    status: 0
                }, {
                    id: 3,
                    name: '西瓜',
                    price: 5,
                    count: 1,
                    status: 0
                }, {
                    id: 4,
                    name: '车厘子',
                    price: 10,
                    count: 1,
                    status: 0
                },
            ]
        }


        ],
        checklist: [],  //单选数据，计算选择的价格
        checkboxModel: [],  //对应的id
        checked: false

    },
    watch: {//深度 watcher
        'checkboxModel': {
            handler: function (val, oldVal) {
                this.shoplists.forEach(item => {
                    if (this.checkboxModel.length === item.productList.length) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                });

            },
            deep: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.shoplists.forEach(item => {
                item.productList.forEach(element => {
                    total += element.price * element.count
                });

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
        },

        
    },
    methods: {
        handleReduce(item) {
            if (item.count === 1) return
            item.count--;
        },
        handleAdd(item) {
            item.count++;
        },
        handleRemove(index, tableindex) {
            this.shoplists[tableindex].productList.splice(index, 1)
        },
        checkedchoice(item) {
            // console.log(item)
            item.status = !item.status;
            this.checklist.push(item)
        },
        isChecked(item) {
            // console.log(item.status)
            return item.status;
        },
        //分类商品全选
        handleTableItem(tableItem) {
            let status = this.isCheckedTableItem(tableItem);
            status = status ? 0 : 1;
            // console.log(tableItem)
            tableItem.productList.forEach(item => {
                item.status = status
                if(item.status) {
                    this.checklist.push(item)
                }else {
                    this.checklist = []
                }
            });
        },
        //选择某产品所有
        isCheckedTableItem(tableItem) {
            var status = true;
            tableItem.productList.forEach(element => {
                console.log(element.status)
                if (!element.status) {
                    status = false;
                    return status
                }
            });
            return status
        },
        // checkedAll() {
        //     console.log(this.checked)
        //     if (this.checked) {//实现反选
        //         this.checkboxModel = [];
        //         this.checklist = []
        //     } else {//实现全选
        //         this.checkboxModel = [];
        //         this.shoplists.forEach((item) => {
        //             this.checkboxModel.push(item.id);
        //         });
        //         this.checklist = this.shoplists
        //     }
        // }
        checkedAllselect() {
            var status = this.isCheckedAll()
            // console.log(status)
            status = status ? 0 : 1;
            this.shoplists.forEach(item => {
                item.productList.forEach((element) => {
                    element.status = status
                    // console.log(element.status)
                    if(element.status) {
                        this.checklist.push(element)
                    }else {
                        this.checklist = []
                    }
                })
            });
        },
        //选择所有
        isCheckedAll() {
            var status = true;
            this.shoplists.forEach(item => {
                item.productList.forEach((element) => {
                    // console.log(element.status)
                    if (!element.status) {
                        status = false
                        return status
                    }
                })
            });
            // console.log(status)
            return status;
        }
    }
})