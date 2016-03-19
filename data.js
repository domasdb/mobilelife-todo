

var data = {
    find: function (text) {
        for(var i = 0; i < this.list.length; i++) {
            if(this.list[i].text == text) return this.list[i];
        }
    },
    change: function(text, done) {
        var item = this.find(text);
        if(item) {
            item.done = done;
            return item;
        }      
    },
    add: function (text, done) {
        var item = this.find(text);
        if(!item) {
            this.list.push({
                text: text,
                done: done
            });
        }
    },
    delete: function (text) {
        for(var i = 0; i < this.list.length; i++) {
            if(this.list[i].text == text) { 
                this.list.splice(i, 1);
                return;
            }
        }
    },
    list: [{
        text: 'Do this', 
        done: false
    }, {
        text: 'Do that',
        done: false
    }]
};

module.exports = data;