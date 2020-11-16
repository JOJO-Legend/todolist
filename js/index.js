$(function (){

  var todolist = {
    // 初始化
    init: function (){
      this.cacheElement()
      this.bindEvent()
    },
    // 缓存要操作的元素
    cacheElement: function (){
      this.$addTask = $('.addTask')
      this.$addBtn = $('.addBtn')
      this.$todolist = $('.todolist')
      this.$all = $('.all')
      this.$done = $('.done')
      this.$remove = $('.remove')
      this.$donelist = $('.donelist')
    },
    // 绑定事件
    bindEvent: function (){
      // this -> todolist
      var _this = this // 缓存this指向

      // 点击添加任务
      this.$addBtn.click(function (){
        // this -> this.$addBtn
        // 获取输入的任务
        var txt = _this.$addTask.val()
        // 空值判断
        if (!txt){
          alert('不能添加空的内容')
          return
        }
        // 添加任务li
        var addDom = `
        <li>
          <input type="checkbox"> 
          <span class="task">${txt}</span>
          <span class="del">删除</span>
          <span class="edit">编辑</span>
        </li>
        `
        _this.$todolist.prepend(addDom)
        _this.$addTask.val('')

        // 判断全选是否勾选
        if (_this.$all.prop('checked')) {
          // 勾选所有任务
          $('.todolist li input').prop('checked',true)
        }

      })

      // 编辑任务
      this.$todolist.on('click','li .edit',function (){
        // 获取当前任务的内容
        var con = $(this).siblings('.task').text()
        // 用input替换span
        $('<input type="text" class="rep">').replaceAll($(this).siblings('.task'))
        // 设置输入框的值并自动聚焦
        $('.rep').val(con).focus()
      })

      // 编辑完成
      this.$todolist.on('blur','.rep',function (){
        // 获取当前输入的内容
        var con = $(this).val()
        // 用span替换input
        var repDom = '<span class="task">'+con+'</span>'
        $(repDom).replaceAll($(this))
      })

      // 删除单条任务
      this.$todolist.on('click','.del',function (){
        // 删除点击点击按钮对应的父元素
        $(this).parent().remove()

        _this.changeAll()
      })

      // 点击全部
      this.$all.click(function (){
        // 判断全选状态
        if ($(this).prop('checked')) {
          $('.todolist li input').prop('checked',true)
        } else {
          $('.todolist li input').prop('checked',false)
        }
      })

      // 点击勾选任务
      this.$todolist.on('click','li input',function (){
        $('.todolist li input').each(function (index,ele){
          _this.changeAll()
        })
      })

      // 批量处理任务
      this.$done.click(function (){
        $('.todolist li input:checked').each(function (index,ele){
          // 获取要删除任务的内容
          var con = $(ele).siblings('.task').text()
          // 添加到已处理列表
          _this.$donelist.append('<li>'+con+'</li>')
          // 删除待办列表中的任务
          $(ele).parent().remove()
        })
      })

      // 批量删除
      this.$remove.click(function (){
        $('.todolist li input:checked').each(function (index,ele){
          $(ele).parent().remove()
        })
      }) 
    },
    changeAll: function (){
      var _this = this
      // 判断是否要勾选全部
      var flag = true
      $('.todolist li input').each(function (index,ele){
        if (!$(ele).prop('checked')) {
          // 去掉全选
          _this.$all.prop('checked',false)
          flag = false
          return false
        }
      })
      if (flag) {// 勾选全部
        _this.$all.prop('checked',true)
      }
      if ($('.todolist li input').length <= 0) {
        _this.$all.prop('checked',false)
      }
    }
  }
  todolist.init()

})

